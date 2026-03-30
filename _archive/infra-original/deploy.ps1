Write-Host "Cece Case Evidence Analyzer - Deploy"

if (!(Test-Path "infra\.env.example")) {
    Write-Host "infra\.env.example not found!"
    exit 1
}

# Load env variables (ignoring comments)
Get-Content infra\.env.example | Where-Object { $_ -notmatch '^#' -and $_ -match '=' } | ForEach-Object {
    $name, $value = $_.Split('=', 2)
    Set-Item -Path "env:$name" -Value $value
}

$gcloud = "gcloud"
if (Test-Path "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd") {
    $gcloud = "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
}

Write-Host "1. Deploying Cloud Run API updates..."
& $gcloud run deploy cece-evidence-api --source ./services/api --region $env:REGION --allow-unauthenticated --set-env-vars="EVIDENCE_BUCKET=$env:EVIDENCE_BUCKET,EVIDENCE_PREFIX=$env:EVIDENCE_PREFIX"

Write-Host "2. Building Next.js Web UI static export..."
Set-Location web
npm install
npm run build
Set-Location ..

Write-Host "3. Deploying Next.js to Firebase Hosting..."
npx --yes firebase-tools deploy --only hosting

Write-Host "================================="
Write-Host "Deployment complete!"
Write-Host "Your analyzer UI is now live on Firebase."
Write-Host "================================="
