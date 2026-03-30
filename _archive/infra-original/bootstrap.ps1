Write-Host "Cece Case Evidence Analyzer - Bootstrap"

if (!(Test-Path "infra\.env.example")) {
    Write-Host "infra\.env.example not found!"
    exit 1
}

# Load env variables (ignoring comments)
Get-Content infra\.env.example | Where-Object { $_ -notmatch '^#' -and $_ -match '=' } | ForEach-Object {
    $name, $value = $_.Split('=', 2)
    Set-Item -Path "env:$name" -Value $value
}

if ($env:GCP_PROJECT_ID -eq "[FILL-IN]") {
    Write-Host "Please fill in GCP_PROJECT_ID in infra/.env.example before running bootstrap"
    exit 1
}

$gcloud = "gcloud"
if (Test-Path "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd") {
    $gcloud = "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
}

Write-Host "Setting GCP Project to $env:GCP_PROJECT_ID"
& $gcloud config set project $env:GCP_PROJECT_ID

Write-Host "Enabling required Google Cloud APIs..."
& $gcloud services enable run.googleapis.com firestore.googleapis.com storage.googleapis.com iam.googleapis.com firebasehosting.googleapis.com

Write-Host "Deploying Cloud Run API (First Time)..."
& $gcloud run deploy cece-evidence-api --source ./services/api --region $env:REGION --allow-unauthenticated --set-env-vars="EVIDENCE_BUCKET=$env:EVIDENCE_BUCKET,EVIDENCE_PREFIX=$env:EVIDENCE_PREFIX"

Write-Host "Initializing Firebase Project..."
if ($env:FIREBASE_PROJECT_ID -ne "[FILL-IN]") {
    npx --yes firebase-tools use --add $env:FIREBASE_PROJECT_ID
    if ($LASTEXITCODE -ne 0) {
        npx --yes firebase-tools use $env:FIREBASE_PROJECT_ID
    }
} else {
    Write-Host "FIREBASE_PROJECT_ID is not set, skipping firebase init..."
}

Write-Host "================================="
Write-Host "Bootstrap complete! Next steps:"
Write-Host "1. Verify Firestore is running in Native mode in your GCP project."
Write-Host "2. Run infra/deploy.ps1 to push the web UI and update API."
Write-Host "================================="
