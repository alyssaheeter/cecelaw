# Developer Workflow

## Branching

- `main` — stable, production-ready
- `dev` — integration branch
- Feature branches: `pr/<pr-number>-<short-description>` e.g. `pr/01-domain-types`

## PR Requirements

Every PR must confirm before review:
- [ ] `tsc --noEmit` passes in all affected packages
- [ ] ESLint passes with zero errors
- [ ] All unit tests pass; coverage has not decreased
- [ ] New env vars documented in `.env.example`
- [ ] No secrets, API keys, or case names in source
- [ ] Relevant docs updated if user-facing behavior changed

## Naming Conventions

| Context | Convention |
|---|---|
| TypeScript files | `kebab-case.ts` |
| Classes / interfaces | `PascalCase` |
| Functions / variables | `camelCase` |
| Database columns | `snake_case` |
| API route params | `camelCase` in URL: `/matters/:matterId` |
| Environment variables | `SCREAMING_SNAKE_CASE` |
| Package names | `@cece/<name>` |
| Test files | `<name>.test.ts` |

## Non-Negotiable Rules

1. No hardcoded matter IDs, case names, or client names in source code
2. No GCP, Firebase, Firestore, or BigQuery SDK imports outside `_archive/`
3. `apps/web` never imports from `packages/analysis` or `packages/ingest` directly
4. All evidence writes must emit a `ChainOfCustodyEvent` before returning success
5. Soft-delete only for evidence data — no hard deletes
6. `allow_remote_ai` must be checked in BOTH the API handler AND `packages/analysis`

## Running Tests

```bash
npm test                          # all workspaces
npm test --workspace=packages/domain   # single package
```

## Linting

```bash
npm run lint                      # all workspaces
```
