// src/models/stats.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface pour les statistiques quotidiennes
export interface IDailyStats extends Document {
  date: Date;
  rideCount: number;
  creditsEarned: number;
  newUsers: number;
  activeUsers: number;
  completedRides: number;
  cancelledRides: number;
  totalRegisteredUsers: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour les statistiques quotidiennes
const DailyStatsSchema: Schema = new Schema({
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

// Interface pour les logs d'activité
export interface IActivityLog extends Document {
  userId: number;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
}

// Schéma pour les logs d'activité
const ActivityLogSchema: Schema = new Schema({
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
    type: Schema.Types.Mixed,
    default: {} 
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true 
  }
});

// Exporter les modèles
export const DailyStats = mongoose.model<IDailyStats>('DailyStats', DailyStatsSchema);
export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);