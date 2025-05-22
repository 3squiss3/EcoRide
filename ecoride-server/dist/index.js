"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// import userRoutes from './routes/user.routes';
// import rideRoutes from './routes/ride.routes';
// Charger les variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Configuration détaillée de CORS pour la sécurité
const corsOptions = {
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Middleware de logging pour le développement
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}
// Connexion à MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoride')
    .then(() => {
    console.log('✅ Connecté à MongoDB');
    console.log(`📊 Base de données: ${mongoose_1.default.connection.name}`);
})
    .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB:', err);
    process.exit(1);
});
// Routes
app.use('/api/auth', auth_routes_1.default);
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
        mongodb: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected'
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
app.use((err, req, res, next) => {
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
//# sourceMappingURL=index.js.map