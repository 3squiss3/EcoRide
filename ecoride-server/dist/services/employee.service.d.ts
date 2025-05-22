export declare const getPendingReviews: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const approveReview: (reviewId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const rejectReview: (reviewId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getReportedIssues: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const resolveIssue: (issueId: number | string, note: string) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=employee.service.d.ts.map