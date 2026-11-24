# Envoi du formulaire Freelance

La route Strapi `POST /api/freelance-contact` envoie les demandes vers
`el.contact.freelance@gmail.com`, avec l'adresse du visiteur en `Reply-To`.

1. Sur ce compte Google, activer la validation en deux etapes et
   [creer un mot de passe d'application](https://myaccount.google.com/apppasswords).
2. Ajouter `CONTACT_GMAIL_APP_PASSWORD` aux variables du **serveur Strapi**
   (dans `photoshop-gallery/.env` en local, ou parmi les secrets de
   l'hebergeur). Dans le terminal Ubuntu, ouvrir le fichier avec
   `cd ~/realPortfolio/photoshop-gallery && nano .env`. Ajouter
   `CONTACT_GMAIL_APP_PASSWORD=` suivi des 16 caracteres du mot de passe
   d'application. Les espaces de presentation sont ignores. Ne pas copier
   `.env.example` par-dessus le fichier existant. Ne jamais mettre le
   secret dans React ni dans Git.
3. Redemarrer Strapi avec `npm run develop`. En local, le formulaire
   contacte `http://localhost:1337` par defaut.
4. Envoyer un message de test et verifier la boite de reception Gmail.
   L'hebergeur Strapi doit permettre les connexions sortantes vers
   `smtp.gmail.com:465`.

## Deployer sur le VPS

1. Deployer le backend `photoshop-gallery` a jour, y compris la route
   `src/api/freelance-contact`, `config/middlewares.ts` et les deux fichiers
   npm. Depuis ce projet sur le VPS, executer `npm ci` et `npm run build`,
   puis redemarrer le service **Strapi de production**. Le mot de passe
   d'application doit etre injecte dans l'environnement de ce service
   (`CONTACT_GMAIL_APP_PASSWORD`). Le `.env` local n'est pas deploye.
2. Construire le frontend avec `npm run build` dans `portfolio` et publier
   le nouveau dossier `build`. Le formulaire utilise
   `https://api.eliestudio.com` en production. `REACT_APP_STRAPI_URL` peut
   surcharger cette URL au moment de la compilation, sans le suffixe `/api`.
3. Strapi autorise `https://eliestudio.com` et `https://www.eliestudio.com`
   par defaut. `CORS_ORIGINS` remplace cette liste si necessaire (origines
   completes separees par des virgules). Si le proxy HTTPS gere les
   requetes `OPTIONS` ou pose lui-meme les en-tetes CORS, regler aussi le
   proxy pour ces origines, ou le laisser transmettre les requetes a Strapi
   sans ajouter de doublon.
4. Avant d'envoyer un vrai message, tester `POST` avec un corps vide.
   Le statut `400` confirme que la route est active, sans envoyer de mail :

   ```bash
   curl -i -H 'Origin: https://eliestudio.com' -H 'Content-Type: application/json' \
     --data '{}' https://api.eliestudio.com/api/freelance-contact
   ```

   Verifier la presence de `Access-Control-Allow-Origin` pour le site,
   puis faire un envoi reel depuis la page publique. Le VPS doit pouvoir
   joindre `smtp.gmail.com:465`.

## Diagnostiquer un echec

- `503 CONTACT_EMAIL_NOT_CONFIGURED` : le serveur n'a pas charge un mot
  de passe d'application de 16 caracteres. Verifier le `.env` de Strapi
  (pas celui de React) et redemarrer le processus.
- `502` : la connexion a Gmail ou l'envoi a echoue. Dans le journal
  Strapi, `EAUTH` indique que Google a refuse l'authentification ;
  `ETIMEDOUT` ou `ECONNECTION` indiquent un probleme de connexion.
- `404` ou `405` sur le `POST` de production : la route n'est pas chargee
  par le Strapi du VPS, ou le proxy ne transmet pas cette requete.
