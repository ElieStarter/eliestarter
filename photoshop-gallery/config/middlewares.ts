export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://ton-domaine.com'], // ← Remplace par ton vrai domaine (ou '*' pour tester)
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: '*',
    },
  },
   'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];




