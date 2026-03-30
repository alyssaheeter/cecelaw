#!/bin/bash
set -e

echo "Cece Case Evidence Analyzer - Deploy"

if [ ! -f infra/.env.example ]; then
    echo "infra/.env.example not found!"
    exit 1
fi

export $(grep -v '^#' infra/.env.example | xargs)

echo "1. Deploying Cloud Run API updates..."
gcloud run deploy cece-evidence-api \
    --source ./services/api \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars="EVIDENCE_BUCKET=$EVIDENCE_BUCKET,EVIDENCE_PREFIX=$EVIDENCE_PREFIX"

echo "2. Building Next.js Web UI static export..."
cd web
npm install
npm run build
cd ..

echo "3. Deploying Next.js to Firebase Hosting..."
firebase deploy --only hosting

echo "================================="
echo "Deployment complete!"
echo "Your analyzer UI is now live on Firebase."
echo "================================="
