export default {
  routes: [
    {
      method: 'POST',
      path: '/freelance-contact',
      handler: 'freelance-contact.send',
      config: { auth: false },
    },
  ],
};
