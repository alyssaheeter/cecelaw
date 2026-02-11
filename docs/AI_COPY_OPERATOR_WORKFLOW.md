# AI Copy Operator Workflow

## Objective
Run standardized copy requests and keep master copy auditable.

## Workflow Modes

### 1) Manual (AI Studio / Gemini UI)
1. Open `prompts/system_instructions.txt` and paste into system instruction field.
2. Open one saved prompt in `/prompts/` and paste as user instruction.
3. Provide request payload from `/requests/*.json` or custom input.
4. Ensure model output contains only:
   - INSERT BLOCK
   - CHANGELOG ENTRY
   - REUSE TAGS
5. Paste INSERT BLOCK into master file.
6. Append CHANGELOG ENTRY to changelog footer.
7. Store REUSE TAGS for modular cleanup.

### 2) Automated (GitHub Action + copygen script)
1. Create request JSON in `/requests/`.
2. Trigger workflow dispatch (or push to `requests/`).
3. Workflow runs `python scripts/copygen/run.py --request <path>`.
4. Review outputs in `/generated/` artifacts.
5. Merge generated outputs into master file through review.

## Versioning Rules
- Minor content updates: bump v1.0 → v1.1 etc. when publishing batch updates.
- Keep one-line changelog entries with version/date/what changed/why.
- Never edit old changelog entries; append only.

## Patch Discipline
- Use `PATCH_EXISTING_BLOCK_MINIMAL_CHANGE.txt` for tightly scoped edits.
- Preserve existing COPY_REF/MODULE_REF IDs unless explicit migration needed.
- Keep legal and ethics constraints unchanged.
