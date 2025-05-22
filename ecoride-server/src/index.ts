import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
// import userRoutes from './routes/user.routes';
// import rideRoutes from './routes/ride.routes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration détaillée de CORS pour la sécurité
const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://ecoride.vercel.app',
        'https://ecoride-frontend.vercel.app'
      ]
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:4173',
        ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
      ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging pour le développement
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoride')
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    console.log(`📊 Base de données: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/rides', rideRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'API EcoRide - Bienvenue !',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Route de santé pour vérifier que l'API fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API EcoRide fonctionne correctement',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Middleware de gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: `La route ${req.method} ${req.originalUrl} n'existe pas`,
    availableRoutes: [
      'GET /',
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// Middleware de gestion des erreurs globales
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Erreur serveur:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erreur interne du serveur' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur EcoRide démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 URL locale: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Frontend autorisé: ${corsOptions.origin}`);
  }
});