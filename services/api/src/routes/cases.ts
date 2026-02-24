import { Router } from "express";
import * as admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";

const router = Router();
const storage = new Storage();
const db = admin.firestore();

const EVIDENCE_BUCKET = process.env.EVIDENCE_BUCKET || "videoevidence";
const EVIDENCE_PREFIX = process.env.EVIDENCE_PREFIX || "Carter";
const EXPORT_BUCKET = process.env.EXPORT_BUCKET || `gs://${EVIDENCE_BUCKET}/${EVIDENCE_PREFIX}/exports`;

router.get("/sync", async (req, res) => {
    try {
        const bucket = storage.bucket(EVIDENCE_BUCKET);
        const [files] = await bucket.getFiles({ prefix: EVIDENCE_PREFIX });

        let fileCount = 0;
        const caseId = EVIDENCE_PREFIX; // Single case mode
        let batch = db.batch();
        let batchCount = 0;

        for (const file of files) {
            // skip directories or exports based on prefix
            if (file.name.endsWith('/')) continue;
            if (file.name.includes('/exports/')) continue;
            if (file.name.includes('/derived-artifacts/')) continue;

            fileCount++;

            const fileRef = db.collection('cases').doc(caseId).collection('inventory').doc(encodeURIComponent(file.name).replace(/\./g, '_'));
            batch.set(fileRef, {
                gcs_uri: `gs://${EVIDENCE_BUCKET}/${file.name}`,
                filename: file.name,
                size: file.metadata.size || 0,
                content_type: file.metadata.contentType || 'application/octet-stream',
                status: 'seen',
                updated_at: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            batchCount++;
            if (batchCount === 490) {
                await batch.commit();
                batch = db.batch();
                batchCount = 0;
            }
        }

        const caseRef = db.collection('cases').doc(caseId);
        batch.set(caseRef, {
            case_name: EVIDENCE_PREFIX,
            case_id: caseId,
            gcs_prefix: `gs://${EVIDENCE_BUCKET}/${EVIDENCE_PREFIX}/`,
            file_count: fileCount,
            last_seen: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        if (batchCount > 0 || fileCount === 0) {
            await batch.commit();
        }

        res.json({ success: true, case_id: caseId, file_count: fileCount });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection('cases').get();
        const cases = snapshot.docs.map(doc => doc.data());
        res.json(cases);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const doc = await db.collection('cases').doc(req.params.id).get();
        res.json(doc.exists ? doc.data() : null);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id/inventory", async (req, res) => {
    try {
        const snapshot = await db.collection('cases').doc(req.params.id).collection('inventory').get();
        const inventory = snapshot.docs.map(doc => doc.data());
        res.json(inventory);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
