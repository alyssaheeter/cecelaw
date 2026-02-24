import { Router } from "express";
import * as admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";

const router = Router();
const storage = new Storage();
const db = admin.firestore();

// Exports route: /cases/:id/exports/latest
router.get("/:id/exports/latest", async (req, res) => {
    try {
        const caseId = req.params.id;
        const caseDoc = await db.collection('cases').doc(caseId).get();

        if (!caseDoc.exists || !caseDoc.data()?.latest_export_prefix) {
            res.status(404).json({ error: "No exports found" });
            return;
        }

        const exportPrefix = caseDoc.data()!.latest_export_prefix; // e.g., gs://videoevidence/Carter/exports/2026...

        // Parse bucket and prefix
        const match = exportPrefix.match(/^gs:\/\/([^\/]+)\/(.+)$/);
        if (!match) {
            res.status(500).json({ error: "Invalid export prefix format" });
            return;
        }

        const bucketName = match[1];
        const prefix = match[2];

        const bucket = storage.bucket(bucketName);
        const [files] = await bucket.getFiles({ prefix });

        const urls: Record<string, string> = {};

        for (const file of files) {
            if (file.name.endsWith('/')) continue;

            // Generate a signed URL for 15 minutes
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000,
            });

            const filename = file.name.split('/').pop() || file.name;
            urls[filename] = url;
        }

        res.json({ success: true, urls });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
