export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
    user: {
        id: number;
        username: string;
        email: string;
        credits: number;
        isDriver: boolean;
        isPassenger: boolean;
        role: string;
    };
}
export declare const register: (data: RegisterData) => Promise<AuthResponse>;
export declare const login: (data: LoginData) => Promise<AuthResponse>;
export declare const logout: () => void;
export declare const getProfile: () => Promise<any>;
export declare const isAuthenticated: () => boolean;
export declare const getToken: () => string | null;
export declare const initializeAuth: () => void;
//# sourceMappingURL=auth.service.d.ts.map