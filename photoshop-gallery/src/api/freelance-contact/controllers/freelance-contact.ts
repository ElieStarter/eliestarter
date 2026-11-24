import type { Context } from 'koa';
import nodemailer from 'nodemailer';

const mailbox = 'el.contact.freelance@gmail.com';
const subjects = {
  devis: 'Demande de devis',
  facture: 'Demande de facture',
  message: 'Message',
};
const services = new Map([
  ['logo', 'Cr\u00e9ation de logo'],
  ['identite', 'Identit\u00e9 visuelle'],
  ['charte', 'Charte graphique'],
  ['supports', 'Supports de communication'],
  ['autre', 'Autre projet'],
]);

const value = (input: unknown) => typeof input === 'string' ? input.trim() : '';
const emailPattern = /^[^\s@<>,;():"\\]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
const controlCharacters = /[\x00-\x1f\x7f]/;

function readRequest(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const fields = body as Record<string, unknown>;
  const type = value(fields.requestType);
  if (type !== 'devis' && type !== 'facture' && type !== 'message') return null;
  if (fields.website !== undefined && fields.website !== '') return null;

  const name = value(fields.name);
  const email = value(fields.email);
  const message = value(fields.message);
  const reference = value(fields.reference);
  const service = services.get(value(fields.service));
  if (!name || name.length > 100 || controlCharacters.test(name)) return null;
  if (email.length > 254 || controlCharacters.test(email) || !emailPattern.test(email)) return null;
  if (!message || message.length > 1500) return null;
  if (type === 'devis' && !service) return null;
  if (type === 'facture' && (!reference || reference.length > 120 || controlCharacters.test(reference))) return null;

  return { type, name, email, message, reference, service };
}

const intervalMs = 10 * 60 * 1000;
const attemptsByIp = new Map<string, number>();
let windowEnds = 0;
let attempts = 0;
let pending = 0;
let warnedAboutPassword = false;

export default {
  async send(ctx: Context) {
    ctx.set('Cache-Control', 'no-store');
    ctx.body = { sent: false };

    const request = ctx.is('application/json') ? readRequest(ctx.request.body) : null;
    if (!request) {
      ctx.status = 400;
      return;
    }

    const password = process.env.CONTACT_GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
    if (password?.length !== 16) {
      if (!warnedAboutPassword) {
        console.warn('[freelance-contact] Set CONTACT_GMAIL_APP_PASSWORD in the Strapi environment to the 16-character Google app password.');
        warnedAboutPassword = true;
      }
      ctx.body = { sent: false, code: 'CONTACT_EMAIL_NOT_CONFIGURED' };
      ctx.status = 503;
      return;
    }

    const now = Date.now();
    if (now >= windowEnds) {
      windowEnds = now + intervalMs;
      attempts = 0;
      attemptsByIp.clear();
    }
    const ipAttempts = attemptsByIp.get(ctx.ip) ?? 0;
    if (ipAttempts >= 5 || attempts >= 30 || pending >= 3) {
      ctx.set('Retry-After', String(pending >= 3 ? 30 : Math.ceil((windowEnds - now) / 1000)));
      ctx.status = 429;
      return;
    }

    attempts += 1;
    pending += 1;
    attemptsByIp.set(ctx.ip, ipAttempts + 1);
    try {
      const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: mailbox, pass: password },
        dnsTimeout: 5000,
        connectionTimeout: 8000,
        greetingTimeout: 5000,
        socketTimeout: 15000,
      });

      const { type, name, email, message, reference, service } = request;
      const result = await transport.sendMail({
        from: { name: 'ElieStudio', address: mailbox },
        to: mailbox,
        replyTo: { address: email, name },
        subject: `[ElieStudio] ${subjects[type]}`,
        text: [
          `Nom : ${name}`,
          `E-mail : ${email}`,
          ...(type === 'devis' ? [`Prestation : ${service}`] : []),
          ...(type === 'facture' ? [`Projet ou r\u00e9f\u00e9rence : ${reference}`] : []),
          '',
          message,
        ].join('\n'),
      });

      if (!result.accepted?.includes(mailbox)) {
        ctx.status = 502;
        return;
      }
      ctx.body = { sent: true };
      ctx.status = 200;
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? error.code : null;
      const reason = typeof code === 'string' && /^(EAUTH|ECONNECTION|ETIMEDOUT|EDNS|ESOCKET|ETLS|EENVELOPE|EMESSAGE)$/.test(code)
        ? code
        : 'UNKNOWN';
      console.warn('[freelance-contact] Gmail SMTP delivery failed:', reason);
      ctx.status = 502;
    } finally {
      pending -= 1;
    }
  },
};
