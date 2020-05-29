# blog_totem_2020

Voici mon projet pour le test.


## Initialisation du projet
---

> $ npm install


## Initialisation des données
---

### Base de données

Avant de lancer le projet il faut s'assurer d'avoir une base de données postgres.

  1. Créer un base de données postgres
  2. Ensuite dans le fichier ./server/config/sequelize.config.json entrez les informations de votre base de données

```
 "development": {
    "username": "<YOUR_USER_NAME>",
    "password": "<YOUR_PASSWORD>",
    "database": "<YOUR_DATABASE_NAME>",
    "host": "127.0.0.1",  
    "port": 5432,
    "dialect": "postgres",
    "logging": false
  }

```

### S3

  - Créez un fichier pour les informations d'identification dans ~/.aws/credentials sous Mac/Linux ou C:\\Users\\USERNAME\\.aws\\credentials sous Windows

```
[default]
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
```

Les clés sont dans le document partagé par mail.

### JWT Token

1. Generer une paire de clé RSA (*[Generateur](https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/)*)

2. Sauvegarder la clé privée (avec l'en-tête et le pied de page) dans un fichier `private.key` à la racine du projet

3. Même opération pour la clé public mais dans le fichier `public.key` toujours à la racine du projet

## Lancement du projet 
---

> $ npm start


## Requêtes
---

Toutes les requêtes à part la création d'utilisateur nécessitent de se connecter (la connexion s'effectue avec le pseudo/mot de passe) au préalable et donc d'avoir un token jwt.

Lors de la connexion le token sera renvoyé, il sera à rajouter dans le header ```authorization``` lors des requêtes.

La partie de recherche d'article ne fonctionne que par mot-clés (insensible à la case) et recherche uniquement sur le titre des articles. Il faut séparer les mots-clés par des espaces uniquements.


