"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => { },
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
