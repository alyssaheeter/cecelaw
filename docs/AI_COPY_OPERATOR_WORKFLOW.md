# AI Copy Operator Workflow

## Objective
Run weekly copy operations with deterministic outputs and audit-ready updates.

## Prerequisites
- Credentials configured in `docs/GEMINI_CREDENTIALS_SETUP.md`
- Master file used as source of truth

## COPY INTO Contract (Strict)
When a request says “Copy into [tier/file]”, the output must contain only:
1. INSERT BLOCK
2. CHANGELOG ENTRY (single line)
3. REUSE TAGS

No extra commentary.

## Manual Workflow (AI Studio)
1. Use `prompts/system_instructions.txt` as system instruction.
2. Select one prompt from `prompts/`.
3. Provide request payload.
4. Confirm output matches strict 3-part contract.
5. Paste INSERT BLOCK into master file.
6. Append CHANGELOG ENTRY to changelog footer.
7. Track REUSE TAGS for module consolidation.

## Automated Workflow (GitHub Action)
1. Add/update request JSON under `requests/`.
2. Trigger `copygen` workflow.
3. Review generated files under `generated/` artifacts.
4. Merge approved changes back into master.

## Version and Patch Discipline
- Keep stable refs: `COPY_REF ... _v1`, `MODULE_REF ... _v1` until formal version bump.
- Use minimal-change patch prompt for controlled edits.
- Append changelog entries; do not rewrite previous entries.

## Compliance Gate
- No legal advice.
- No results promises.
- No fabricated credentials/metrics.
- Use [FILL-IN] for unknown facts.
