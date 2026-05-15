# Testing Guide

## Frontend

Run component and route tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

## Backend

Run API smoke tests:

```bash
cd server
npm test
```

## End-to-End

Run Playwright checks:

```bash
npm run test:e2e
```

Set `PLAYWRIGHT_BASE_URL` if the app is running on a non-default host.

## CI Coverage

- Frontend quality gates: lint, vitest, production build
- Backend quality gates: lint, node test runner
- Security gates: dependency review, `npm audit`
