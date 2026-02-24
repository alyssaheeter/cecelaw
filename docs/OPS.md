# Operations

- Check Pub/Sub subscription for dead-letters or accumulated unacknowledged messages.
- Monitor Cloud Run logs for `api` and `worker` services.
- Data retention is controlled largely by GCS bucket lifecycle rules (needs to be applied manually if specific to raw vs derived) and `RETENTION_DAYS` application config.
- Ensure only approved users are in the `ALLOWED_DOMAINS` for Firebase Auth.
