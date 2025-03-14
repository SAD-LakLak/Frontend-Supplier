import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";
import axiosInstance from "../constants/axiosConfig.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    login: (tokens: { accessToken: string; refreshToken: string }) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!(accessToken && refreshToken));

    useEffect(() => {
        if (accessToken && refreshToken) {
            setIsAuthenticated(true);
        }
    }, [accessToken, refreshToken]);

    const login = (tokens: { accessToken: string; refreshToken: string }) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        setIsAuthenticated(true);

        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
    };

    const logout = () => {
        axiosInstance.post("/logout/", {}, {headers: {Authorization: `Bearer ${accessToken}`}});

        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);

        // حذف از localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) throw new Error("توکن رفرش موجود نیست.");

        try {
            const response = await fetch("/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"refresh": refreshToken}),
            });

            if (!response.ok) throw new Error("بازیابی توکن دسترسی ناموفق بود.");

            const data = await response.json();
            setAccessToken(data.access);
            localStorage.setItem("accessToken", data.access);
        } catch (error) {
            console.error("خطا در بازیابی توکن دسترسی:", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                accessToken,
                refreshToken,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth باید داخل AuthProvider استفاده شود.");
    }
    return context;
};
