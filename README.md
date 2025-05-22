# EcoRide - Application de Covoiturage Écologique

> Plateforme de covoiturage encourageant les déplacements écologiques et économiques

## 🌱 À propos du projet

EcoRide est une application web de covoiturage développée par une startup française. L'objectif est de réduire l'impact environnemental des déplacements en encourageant le partage de véhicules, avec un focus particulier sur les véhicules électriques.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18.x ou supérieure)
- **npm** ou **yarn**
- **Docker** et **Docker Compose**
- **Git**

### Vérification des prérequis
```bash
node --version    # v18.x.x ou plus
npm --version     # 8.x.x ou plus
docker --version  # 20.x.x ou plus
docker-compose --version # 2.x.x ou plus
```

## 🚀 Installation et Déploiement Local

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/ecoride.git
cd ecoride
```

### 2. Lancer les bases de données avec Docker

```bash
# Démarrer PostgreSQL et MongoDB
docker-compose up -d

# Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps
```

Les services suivants seront disponibles :
- **PostgreSQL** : `localhost:5432`
- **MongoDB** : `localhost:27017`
- **PgAdmin** : `http://localhost:8080`
- **Mongo Express** : `http://localhost:8081`

### 3. Configuration du Backend

```bash
# Aller dans le dossier backend
cd ecoride-server

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

#### Configuration des variables d'environnement (.env)
```env
# Base de données
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecoride"
MONGODB_URI="mongodb://admin:password@localhost:27017/ecoride?authSource=admin"

# Authentification
JWT_SECRET="votre-cle-secrete-locale-256-bits"

# Serveur
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"

# Email (optionnel pour le développement)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=test@ecoride.dev
SMTP_PASS=test-password
```

#### Initialiser la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init

# (Optionnel) Peupler avec des données de test
npx prisma db seed
```

#### Démarrer le serveur backend
```bash
# Mode développement avec rechargement automatique
npm run dev

# Ou mode production local
npm run build
npm start
```

Le backend sera accessible sur : `http://localhost:3000`

### 4. Configuration du Frontend

```bash
# Aller dans le dossier frontend (dans un nouveau terminal)
cd ecoride-client

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local
```

#### Configuration des variables d'environnement (.env.local)
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0-dev
VITE_ENVIRONMENT=development
```

#### Démarrer le serveur frontend
```bash
# Mode développement
npm run dev
```

L'application frontend sera accessible sur : `http://localhost:5173`

## 🗄️ Gestion des Bases de Données

### Accès aux interfaces d'administration

#### PgAdmin (PostgreSQL)
- **URL** : `http://localhost:8080`
- **Email** : `admin@ecoride.fr`
- **Mot de passe** : `password`

Pour ajouter le serveur PostgreSQL :
- **Host** : `postgres` (nom du service Docker)
- **Port** : `5432`
- **Database** : `ecoride`
- **Username** : `postgres`
- **Password** : `password`

#### Mongo Express (MongoDB)
- **URL** : `http://localhost:8081`
- **Username** : `admin`
- **Password** : `password`

### Commandes utiles Prisma

```bash
# Voir l'état des migrations
npx prisma migrate status

# Réinitialiser la base de données
npx prisma migrate reset

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
```

Prisma Studio sera disponible sur : `http://localhost:5555`

## 📁 Structure du Projet

```
ecoride/
├── docker-compose.yml          # Configuration Docker
├── README.md                   # Ce fichier
├── .gitignore                 # Fichiers à ignorer par Git
│
├── ecoride-server/            # Backend API
│   ├── src/                   # Code source
│   │   ├── controllers/       # Contrôleurs
│   │   ├── routes/           # Routes API
│   │   ├── middleware/       # Middlewares
│   │   ├── services/         # Services métier
│   │   └── utils/            # Utilitaires
│   ├── prisma/               # Configuration Prisma
│   │   ├── schema.prisma     # Schéma de base de données
│   │   ├── migrations/       # Migrations
│   │   └── seed.ts          # Données de test
│   ├── package.json
│   ├── .env.example
│   └── tsconfig.json
│
└── ecoride-client/           # Frontend
    ├── src/                  # Code source
    │   ├── components/       # Composants réutilisables
    │   ├── pages/           # Pages de l'application
    │   ├── services/        # Services API
    │   ├── utils/           # Utilitaires
    │   └── styles/          # Styles CSS
    ├── public/              # Assets statiques
    ├── package.json
    ├── .env.example
    └── vite.config.js
```

## 🧪 Tests

### Backend
```bash
cd ecoride-server

# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

### Frontend
```bash
cd ecoride-client

# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e
```

## 🛠️ Scripts Utiles

### Développement
```bash
# Démarrer tout l'environnement de développement
./scripts/dev-start.sh

# Arrêter tous les services
./scripts/dev-stop.sh

# Réinitialiser la base de données avec des données de test
./scripts/reset-db.sh
```

### Débogage
```bash
# Logs des conteneurs Docker
docker-compose logs -f postgres
docker-compose logs -f mongodb

# Vérifier les connexions
npm run health-check
```

## 🚨 Résolution des Problèmes Courants

### Erreur de connexion à la base de données
```bash
# Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps

# Redémarrer les services
docker-compose restart postgres mongodb
```

### Port déjà utilisé
```bash
# Trouver le processus utilisant le port 3000
lsof -i :3000

# Ou changer le port dans .env
PORT=3001
```

### Erreur Prisma "Database does not exist"
```bash
# Recréer la base de données
docker-compose down
docker-compose up -d postgres
npx prisma migrate dev
```

### Cache npm/node_modules corrompus
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Comptes de Test

Une fois la base de données initialisée avec le seed, vous pouvez utiliser ces comptes :

### Utilisateur Standard
- **Email** : `user@ecoride.fr`
- **Mot de passe** : `password123`
- **Rôle** : Utilisateur (passager/chauffeur)

### Employé
- **Email** : `employee@ecoride.fr`
- **Mot de passe** : `password123`
- **Rôle** : Employé (modération)

### Administrateur
- **Email** : `admin@ecoride.fr`
- **Mot de passe** : `password123`
- **Rôle** : Administrateur

## 📚 Documentation API

Une fois le backend démarré, la documentation Swagger est disponible sur :
`http://localhost:3000/api/docs`

## 🌐 URLs de Développement

- **Frontend** : `http://localhost:5173`
- **Backend API** : `http://localhost:3000`
- **Documentation API** : `http://localhost:3000/api/docs`
- **Prisma Studio** : `http://localhost:5555`
- **PgAdmin** : `http://localhost:8080`
- **Mongo Express** : `http://localhost:8081`

## 🤝 Contribution

1. Créer une branche feature depuis `develop`
2. Faire vos modifications
3. Écrire/mettre à jour les tests
4. Commit avec des messages conventionnels
5. Push et créer une Pull Request

### Standards de code
```bash
# Linter
npm run lint

# Formatter
npm run format

# Vérification des types
npm run type-check
```


**Développé avec 💚 pour un transport plus écologique**