import express from "express";
import dotenv from "dotenv";
import { processVideo } from "./processors/videoProcessor";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/pubsub/push", async (req, res) => {
    try {
        const message = req.body.message;
        if (!message || !message.data) {
            res.status(400).send("Bad Request");
            return;
        }
        const data = JSON.parse(Buffer.from(message.data, "base64").toString());
        console.log(`Processing Job:`, data);

        // Default to resolving so we don't infinitely retry during development scaffolding
        if (data.content_type?.includes("video")) {
            await processVideo(data.case_id, data.file_id, data.file_path).catch(e => console.error(e));
        } else {
            console.log("Document processor not fully implemented yet.");
        }

        res.status(200).send("OK");
    } catch (err: any) {
        console.error("Worker error:", err);
        res.status(500).send("Processing failed"); // Causes pub/sub to retry
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Worker listening on ${PORT}`));
