import { z } from "zod";

export const EventSchema = z.object({
    sequence_number: z.number().int(),
    timestamp_start: z.number(),
    timestamp_end: z.number(),
    category: z.string(),
    title: z.string(),
    summary: z.string(),
    confidence: z.number().min(0).max(1),
    source_pointer: z.string(),
    basis: z.enum(["visual", "transcript", "both", "doc_text"]),
    review_status: z.enum(["Draft", "Reviewed"]),
    notes: z.string().optional()
});

export const GeminiOutputSchema = z.object({
    events: z.array(EventSchema)
});
