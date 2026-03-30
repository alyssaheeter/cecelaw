"use client";

import { useAuth } from "./AuthProvider";
import Link from "next/link";
import { LogOut, Scale } from "lucide-react";

export function Navigation() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex shrink-0 items-center">
                            <Scale className="h-8 w-8 text-brand-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                Evidence Analyzer
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    {user.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex items-center justify-center"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign out
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </nav>
    );
}
