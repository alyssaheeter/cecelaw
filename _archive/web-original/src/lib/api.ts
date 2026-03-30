import { auth } from "./firebase";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

export async function fetchApi(path: string, options: RequestInit = {}) {
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    if (res.headers.get("content-type")?.includes("application/json")) {
        return res.json();
    }
    return res.blob();
}
