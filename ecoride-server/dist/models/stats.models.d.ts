import mongoose, { Document } from 'mongoose';
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
export interface IActivityLog extends Document {
    userId: number;
    action: string;
    details: Record<string, any>;
    timestamp: Date;
}
export declare const DailyStats: mongoose.Model<IDailyStats, {}, {}, {}, mongoose.Document<unknown, {}, IDailyStats, {}> & IDailyStats & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare const ActivityLog: mongoose.Model<IActivityLog, {}, {}, {}, mongoose.Document<unknown, {}, IActivityLog, {}> & IActivityLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=stats.models.d.ts.map