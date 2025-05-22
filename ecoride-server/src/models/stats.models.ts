import mongoose, { Schema, Document } from 'mongoose';

interface IDailyStats extends Document {
  date: Date;
  rideCount: number;
  creditsEarned: number;
  newUsers: number;
  activeUsers: number;
  completedRides: number;
  cancelledRides: number;
}

const DailyStatsSchema: Schema = new Schema({
  date: { type: Date, required: true, unique: true },
  rideCount: { type: Number, default: 0 },
  creditsEarned: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  activeUsers: { type: Number, default: 0 },
  completedRides: { type: Number, default: 0 },
  cancelledRides: { type: Number, default: 0 }
});

export const DailyStats = mongoose.model<IDailyStats>('DailyStats', DailyStatsSchema);