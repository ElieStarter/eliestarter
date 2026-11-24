import type { Context } from 'koa';

export default ({ env }) => {
  const publicOrigins = env.array('CORS_ORIGINS', [
    'https://eliestudio.com',
    'https://www.eliestudio.com',
  ]);
  const allowLocal = env('NODE_ENV', 'development') !== 'production';
  const loopback = /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/;

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: (ctx: Context) => {
          const origin = ctx.get('Origin');
          return publicOrigins.includes(origin) || (allowLocal && loopback.test(origin)) ? [origin] : [];
        },
        keepHeadersOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
