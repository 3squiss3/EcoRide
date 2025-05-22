"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLog = exports.DailyStats = void 0;
// src/models/stats.model.ts
const mongoose_1 = __importStar(require("mongoose"));
// Schéma pour les statistiques quotidiennes
const DailyStatsSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
        index: true
    },
    rideCount: {
        type: Number,
        default: 0,
        min: 0
    },
    creditsEarned: {
        type: Number,
        default: 0,
        min: 0
    },
    newUsers: {
        type: Number,
        default: 0,
        min: 0
    },
    activeUsers: {
        type: Number,
        default: 0,
        min: 0
    },
    completedRides: {
        type: Number,
        default: 0,
        min: 0
    },
    cancelledRides: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRegisteredUsers: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});
// Schéma pour les logs d'activité
const ActivityLogSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true,
        enum: ['USER_REGISTERED', 'RIDE_CREATED', 'RIDE_JOINED', 'RIDE_COMPLETED', 'RIDE_CANCELLED', 'REVIEW_SUBMITTED']
    },
    details: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
});
// Exporter les modèles
exports.DailyStats = mongoose_1.default.model('DailyStats', DailyStatsSchema);
exports.ActivityLog = mongoose_1.default.model('ActivityLog', ActivityLogSchema);
//# sourceMappingURL=stats.models.js.map