export interface EmployeeData {
    username: string;
    email: string;
    password: string;
}
export interface SuspensionData {
    userId: number | string;
    duration: number;
    reason: string;
}
export declare const getStats: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getEmployees: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const createEmployee: (data: EmployeeData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const toggleEmployeeStatus: (employeeId: number | string, status: "ACTIVE" | "SUSPENDED") => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getUsers: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const suspendUser: (data: SuspensionData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const reactivateUser: (userId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=admin.service.d.ts.map