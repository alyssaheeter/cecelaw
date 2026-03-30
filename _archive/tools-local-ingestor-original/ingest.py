import argparse
import os
import hashlib
import requests
import time
from google.cloud import storage

def compute_sha256(filepath):
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def get_content_type(filename):
    ext = filename.lower().split('.')[-1]
    if ext in ['mp4', 'mov', 'mkv', 'avi']: return 'video/' + ext
    if ext in ['pdf']: return 'application/pdf'
    if ext in ['docx']: return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    if ext in ['txt']: return 'text/plain'
    if ext in ['jpg', 'jpeg']: return 'image/jpeg'
    if ext in ['png']: return 'image/png'
    return 'application/octet-stream'

def upload_to_gcs(local_path, gcs_path, bucket_name, dry_run=False):
    print(f"Uploading {local_path} to gs://{bucket_name}/{gcs_path}")
    if dry_run: return
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(gcs_path)
    blob.upload_from_filename(local_path)

def notify_api(api_base, case_id, case_name, files, token=None, dry_run=False):
    print(f"Notifying API for case {case_id} with {len(files)} files")
    if dry_run: return
    
    headers = {}
    if token: headers["Authorization"] = f"Bearer {token}"
    
    payload = {
        "case_id": case_id,
        "name": case_name,
        "files": files
    }
    
    for attempt in range(3):
        try:
            resp = requests.post(f"{api_base}/cases", json=payload, headers=headers)
            resp.raise_for_status()
            print("Successfully registered files with API")
            return
        except Exception as e:
            print(f"API attempt {attempt+1} failed: {e}")
            time.sleep(2)
    print("Failed to notify API after 3 attempts.")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, help="Root folder like C:\\Users\\fcece\\Carter")
    parser.add_argument("--case", help="Optional specific case name to ingest")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    
    api_base = os.environ.get("API_BASE", "http://localhost:8080")
    raw_bucket = os.environ.get("RAW_BUCKET", "").replace("gs://", "")
    token = os.environ.get("ID_TOKEN")

    if not raw_bucket and not args.dry_run:
        print("Error: RAW_BUCKET environment variable is not set. e.g RAW_BUCKET=my-bucket")
        return

    for case_folder in os.listdir(args.root):
        case_path = os.path.join(args.root, case_folder)
        if not os.path.isdir(case_path):
            continue
            
        if args.case and args.case != case_folder:
            continue
            
        print(f"Processing case: {case_folder}")
        case_id = case_folder.lower().replace(" ", "_").replace("-", "_")
        
        files_to_register = []
        
        for dirpath, _, filenames in os.walk(case_path):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(filepath, args.root)
                # GCS paths should use forward slashes
                gcs_path = rel_path.replace("\\", "/")
                
                content_type = get_content_type(filename)
                
                if content_type == 'application/octet-stream':
                   print(f"Skipping unknown file type: {filename}")
                   continue
                
                file_hash = compute_sha256(filepath)
                file_id = f"{case_id}_{file_hash[:8]}"
                
                try:
                    upload_to_gcs(filepath, gcs_path, raw_bucket, args.dry_run)
                    files_to_register.append({
                        "id": file_id,
                        "name": filename,
                        "path": gcs_path,
                        "content_type": content_type,
                        "hash": file_hash
                    })
                except Exception as e:
                    print(f"Failed to process {filename}: {e}")
                
        if files_to_register:
            notify_api(api_base, case_id, case_folder, files_to_register, token, args.dry_run)

if __name__ == "__main__":
    main()
