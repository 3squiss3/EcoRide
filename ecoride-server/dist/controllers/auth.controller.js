"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-token-ecoride-app';
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet utilisateur ou cette adresse email existe déjà' });
        }
        // Hasher le mot de passe
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Créer l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                credits: 20 // 20 crédits offerts à la création du compte
            }
        });
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                credits: newUser.credits,
                role: newUser.role
            }
        });
    }
    catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }
        // Vérifier si l'utilisateur est suspendu
        if (user.suspendedUntil && new Date(user.suspendedUntil) > new Date()) {
            return res.status(403).json({
                message: 'Votre compte est suspendu',
                suspendedUntil: user.suspendedUntil
            });
        }
        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                credits: user.credits,
                isDriver: user.isDriver,
                isPassenger: user.isPassenger,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                driverProfile: {
                    include: {
                        vehicles: true,
                        preferences: true
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // Masquer le mot de passe
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération du profil' });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.controller.js.map