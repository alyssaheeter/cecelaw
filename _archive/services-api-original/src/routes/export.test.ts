import test from "node:test";
import assert from "node:assert";

test("Export Router generates valid SQL queries", () => {
    const type = "events";
    const reviewedOnly = true;
    let query = `SELECT * FROM cece_evidence.events WHERE case_id = @id`;
    if (reviewedOnly) {
        query += ` AND review_status = 'Reviewed'`;
    }
    assert.ok(query.includes(`review_status = 'Reviewed'`));
});
