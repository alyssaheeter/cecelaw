import test from "node:test";
import assert from "node:assert";
import { GeminiOutputSchema } from "../schema";

test("Gemini JSON Schema Validation", () => {
    const validJson = {
        events: [
            {
                sequence_number: 1,
                timestamp_start: 1.5,
                timestamp_end: 5.5,
                category: "Test",
                title: "Test Event",
                summary: "This is valid",
                confidence: 0.99,
                source_pointer: "vid=1, ts=0",
                basis: "visual",
                review_status: "Draft",
            }
        ]
    };

    const result = GeminiOutputSchema.safeParse(validJson);
    assert.strictEqual(result.success, true);

    const invalidJson = {
        events: [
            { title: "Missing fields" }
        ]
    };
    const invalidResult = GeminiOutputSchema.safeParse(invalidJson);
    assert.strictEqual(invalidResult.success, false);
});
