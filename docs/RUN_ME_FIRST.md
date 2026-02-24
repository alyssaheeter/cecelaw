# Cece Case Evidence Analyzer

## 1. Initial Configuration Setup

Before running anything, update these configuration files with valid infrastructure IDs. Look for `[FILL-IN]` placeholders:

- `infra/.env.example` -> Copy to `infra/.env` and update the placeholders.
- `config/env.example` -> Copy to `config/.env` and update the placeholders.
- `config/app.config.json` -> Update the placeholders.

Required Variables to Fill In:
1. `GCP_PROJECT_ID` - Your Google Cloud project ID.
2. `REGION` - Resource location (e.g. `us-central1`).
3. `FIREBASE_PROJECT_ID` - Firebase project identifier (same as Google Cloud usually).
4. `ALLOWED_DOMAINS` - E.g. `cecelaw.com` to restrict authentication.

## 2. Setting Up the Infrastructure

Once the configs are generated and configured:
```bash
# Set execute permissions
chmod +x infra/bootstrap.sh
chmod +x infra/deploy.sh

# Bootstrap the Cloud project and API (Run this first!)
./infra/bootstrap.sh

# Deploy Web UI and update API
./infra/deploy.sh
```

## 3. Runner Analysis Setup

You will use Google Application Default Credentials (ADC) to authenticate to Gemini CLI.

```bash
# Authenticate gcloud locally for API / GCS permissions
gcloud auth application-default login

# Optional: ensure Gemini CLI is pointing to valid keys / ADC
export GEMINI_API_KEY="your-api-key" 

# Setup python environment
cd tools/runner
pip install -r requirements.txt
```

## 4. Run the Analyzer End-to-End

To process the `Carter` case, evaluate deterministic evidence chunks, and extract intelligence using Gemini CLI:

```bash
python tools/runner/run_all.py \
    --case "Carter" \
    --evidence_bucket "videoevidence" \
    --evidence_prefix "Carter" \
    --export_bucket "videoevidence"
```

## 5. Web UI Access

1. Open your Firebase Hosted URL generated in Step 2.
2. Sign in with Google (restricted by your `ALLOWED_DOMAINS`).
3. View the "Carter" case in the Dashboard.
4. Check the `Inventory` list.
5. Click **Relevant Clips**, **Timeline**, **Doc Facts** or **Inventory** buttons to download the 4 completed baseline CSV exports directly from signed URLs.
