import test from "node:test";
import assert from "node:assert";
import { formatTimestamp } from "./timestamps";

test("formatTimestamp formats correctly", () => {
    assert.strictEqual(formatTimestamp(0), "00:00:00");
    assert.strictEqual(formatTimestamp(61), "00:01:01");
    assert.strictEqual(formatTimestamp(3661), "01:01:01");
    assert.throws(() => formatTimestamp(-1), /negative timestamps/);
});
