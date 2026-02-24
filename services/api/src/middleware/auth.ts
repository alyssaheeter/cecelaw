import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const domain = decoded.email?.split("@")[1];
        const allowed = process.env.ALLOWED_DOMAINS?.split(",") || [];

        if (allowed.length > 0 && !allowed.includes(domain || "")) {
            res.status(403).send("Domain not allowed");
            return;
        }

        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
};
