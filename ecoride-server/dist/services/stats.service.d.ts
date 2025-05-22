export declare class StatsService {
    static logActivity(userId: number, action: string, details?: Record<string, any>): Promise<void>;
    static updateDailyStats(): Promise<void>;
    static getWeeklyStats(): Promise<(import("mongoose").Document<unknown, {}, import("../models/stats.models").IDailyStats, {}> & import("../models/stats.models").IDailyStats & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    static getTotalStats(): Promise<any>;
}
//# sourceMappingURL=stats.service.d.ts.map