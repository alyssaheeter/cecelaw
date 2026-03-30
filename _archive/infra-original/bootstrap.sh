#!/bin/bash
set -e

echo "Cece Case Evidence Analyzer - Bootstrap"

if [ ! -f infra/.env.example ]; then
    echo "infra/.env.example not found!"
    exit 1
fi

# Load env variables (ignoring comments)
export $(grep -v '^#' infra/.env.example | xargs)

if [ "$GCP_PROJECT_ID" == "[FILL-IN]" ]; then
    echo "Please fill in GCP_PROJECT_ID in infra/.env.example before running bootstrap"
    exit 1
fi

echo "Setting GCP Project to $GCP_PROJECT_ID"
gcloud config set project $GCP_PROJECT_ID

echo "Enabling required Google Cloud APIs..."
gcloud services enable run.googleapis.com \
    firestore.googleapis.com \
    storage.googleapis.com \
    iam.googleapis.com \
    firebasehosting.googleapis.com

echo "Deploying Cloud Run API (First Time)..."
gcloud run deploy cece-evidence-api \
    --source ./services/api \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars="EVIDENCE_BUCKET=$EVIDENCE_BUCKET,EVIDENCE_PREFIX=$EVIDENCE_PREFIX"

echo "Initializing Firebase Project..."
if [ "$FIREBASE_PROJECT_ID" != "[FILL-IN]" ]; then
    firebase use --add $FIREBASE_PROJECT_ID || firebase use $FIREBASE_PROJECT_ID
else
    echo "FIREBASE_PROJECT_ID is not set, skipping firebase init..."
fi

echo "================================="
echo "Bootstrap complete! Next steps:"
echo "1. Verify Firestore is running in Native mode in your GCP project."
echo "2. Run infra/deploy.sh to push the web UI and update API."
echo "================================="
