import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Authentication disabled
    next();
};
