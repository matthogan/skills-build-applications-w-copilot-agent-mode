# Octofit Tracker Frontend

This React 19 + Vite app uses API endpoints from the Node.js backend.

## Environment configuration

Define the Codespaces name in a local environment file:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests are built as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm --prefix octofit-tracker/frontend install
npm --prefix octofit-tracker/frontend run dev
```
