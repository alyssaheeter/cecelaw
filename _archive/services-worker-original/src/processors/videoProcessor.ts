import { Storage } from "@google-cloud/storage";
import { BigQuery } from "@google-cloud/bigquery";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

const storage = new Storage();
const bq = new BigQuery();
const datasetId = process.env.BQ_DATASET || "cece_evidence";

export async function processVideo(caseId: string, fileId: string, filePath: string) {
    const bucketName = process.env.RAW_BUCKET?.replace("gs://", "") || "";
    if (!bucketName) {
        console.log("No raw bucket configured");
        return;
    }
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-"));
    const localVideoPath = path.join(tempDir, "video.mp4");

    try {
        console.log(`Downloading gs://${bucketName}/${filePath}...`);
        await storage.bucket(bucketName).file(filePath).download({ destination: localVideoPath });

        console.log(`Running FFMPEG audio extraction on ${localVideoPath}`);
        execSync(`ffmpeg -i "${localVideoPath}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "${tempDir}/audio.wav"`, { stdio: "ignore" });

        console.log(`Mocking AI GenAI Video+Audio Extraction to BigQuery...`);
        const events = [
            {
                sequence_number: 1,
                timestamp_start: 0.0,
                timestamp_end: 15.0,
                category: "Observation",
                title: "Initial video recording segment",
                summary: "Video shows the beginning of the evidence.",
                confidence: 0.95,
                source_pointer: `video_id=${fileId}, start_ts=0, end_ts=15`,
                basis: "visual",
                review_status: "Draft",
                notes: ""
            }
        ];

        for (const e of events) {
            await bq.dataset(datasetId).table("events").insert([{
                case_id: caseId, evidence_id: fileId, ...e, created_at: BigQuery.timestamp(new Date())
            }]);

            await bq.dataset(datasetId).table("case_outline_rows").insert([{
                case_id: caseId, sequence_number: e.sequence_number, fact_text: e.summary,
                source_type: "video", source_file: filePath, source_pointer: e.source_pointer,
                basis: e.basis, confidence: e.confidence, review_status: "Draft", notes: ""
            }]);
        }

        await bq.query(`UPDATE \`${process.env.GCP_PROJECT_ID}.${datasetId}.evidence_files\` SET status = 'processed' WHERE id = '${fileId}'`);

    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}
