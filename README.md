# EcoRide - Plateforme de Covoiturage Écologique

EcoRide est une application de covoiturage écologique permettant aux utilisateurs de partager leurs trajets tout en réduisant leur empreinte carbone.

## Prérequis

- Node.js (version LTS recommandée, v20.11.1 utilisée pour le développement)
- PostgreSQL
- MongoDB
- npm

## Installation

### Backend

1. Cloner le dépôt
```bash
git clone https://github.com/3squiss3/EcoRide
cd ecoride/ecoride-server

#### 2. Déploiement sur des Plateformes Cloud

Voici les instructions pour déployer l'application sur différentes plateformes cloud :

**Backend (Node.js) sur Render :**
```markdown
## Déploiement du Backend sur Render

1. Créez un compte sur [Render](https://render.com/)

2. Créez un nouveau service Web:
   - Connectez votre dépôt GitHub
   - Sélectionnez le dossier `ecoride-server` comme répertoire racine
   - Spécifiez `npm install` comme commande d'installation
   - Spécifiez `npm start` comme commande de démarrage

3. Configurez les variables d'environnement dans l'interface Render:
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render utilise cette valeur)
   - `DATABASE_URL`: URL de votre base de données PostgreSQL
   - `MONGODB_URI`: URL de votre base de données MongoDB
   - `JWT_SECRET`: votre clé secrète JWT

4. Créez le service et attendez le déploiement

5. Notez l'URL générée par Render, vous en aurez besoin pour configurer le frontend