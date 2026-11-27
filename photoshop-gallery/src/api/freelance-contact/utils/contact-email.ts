const titles = {
  devis: 'Nouvelle demande de projet',
  facture: 'Nouvelle demande de facture',
  message: 'Nouveau message',
};

export type ContactEmail = {
  type: keyof typeof titles;
  name: string;
  email: string;
  message: string;
  service?: string;
  reference?: string;
};

const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (character) => htmlEntities[character]);

export const contactLogoCid = 'el-monogram@eliestudio.com';

export const renderContactEmail = ({ type, name, email, message, service, reference }: ContactEmail) => {
  const details: Array<[string, string]> = [
    ['Nom complet', name],
    ['Adresse e-mail', email],
  ];
  if (type === 'devis' && service) details.push(['Prestation souhait\u00e9e', service]);
  if (type === 'facture' && reference) details.push(['Projet ou r\u00e9f\u00e9rence', reference]);

  const detailRows = details.map(([label, value], index) => `
    <tr>
      <td style="padding:${index === 0 ? '0' : '16px'} 0 0;color:#21c7a8;font-size:14px;font-weight:bold;line-height:21px;">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td style="padding-top:5px;color:#f5f7fa;font-size:17px;line-height:25px;overflow-wrap:anywhere;word-break:break-word;">
        ${escapeHtml(value)}
      </td>
    </tr>`).join('');

  const at = email.lastIndexOf('@');
  const replyUrl = 'mailto:' + encodeURIComponent(email.slice(0, at)) + email.slice(at);
  const messageHtml = escapeHtml(message).replace(/\r\n|\r|\n/g, '<br>');

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titles[type]} | ElieStudio</title>
</head>
<body style="margin:0;padding:0;background-color:#202326;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#202326">
    <tr>
      <td align="center" style="padding:16px 10px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0a1320"
          style="max-width:680px;border-radius:12px;background-color:#0a1320;">
          <tr>
            <td style="padding:22px;color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding:0 0 15px;border-bottom:2px solid #21c7a8;">
                    <img src="cid:${contactLogoCid}" alt="ElieStudio" width="72" height="72"
                      style="display:block;width:72px;height:72px;margin:0 auto;border:0;color:#21c7a8;">
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;">
                    <h1 style="margin:0;color:#f5f7fa;font-size:23px;font-weight:bold;line-height:30px;">${titles[type]}</h1>
                    <p style="margin:12px 0 0;color:#a7b5c4;font-size:16px;line-height:24px;">Un prospect vous a contact&eacute; depuis votre portfolio.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#121f2e"
                      style="background-color:#121f2e;border-radius:8px;">
                      <tr>
                        <td style="padding:17px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
                            ${detailRows}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;">
                    <h2 style="margin:0;color:#21c7a8;font-size:15px;font-weight:bold;line-height:22px;">MESSAGE DU CLIENT</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#121f2e"
                      style="table-layout:fixed;background-color:#121f2e;border-radius:8px;">
                      <tr>
                        <td style="padding:17px;color:#f5f7fa;font-size:16px;line-height:24px;overflow-wrap:anywhere;word-break:break-word;">${messageHtml}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#21c7a8"
                      style="background-color:#21c7a8;border-radius:8px;">
                      <tr>
                        <td align="center">
                          <a href="${escapeHtml(replyUrl)}" style="display:block;padding:14px;color:#07111f;font-size:17px;font-weight:bold;line-height:24px;text-decoration:none;">R&eacute;pondre au prospect</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px;border-top:1px solid #2b3948;color:#9eafbf;font-size:13px;line-height:20px;">
                    Elie Studio &mdash; <a href="https://eliestudio.com" style="color:#9eafbf;text-decoration:underline;">eliestudio.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
