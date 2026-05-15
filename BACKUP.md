# Backup and Recovery

## MongoDB Atlas

- Enable automated backups on the production cluster.
- Use point-in-time recovery if your Atlas tier supports it.
- Schedule a monthly restore drill into a staging cluster.

## Media

- Keep Cloudinary asset versioning enabled.
- Export critical media snapshots on a scheduled basis to secondary storage if retention matters.

## Environment Recovery

- Store production environment variables in the hosting secret manager.
- Maintain an encrypted offline copy of required secrets with limited team access.

## Recovery Checklist

1. Restore MongoDB from the last known good snapshot.
2. Rehydrate environment variables from the secret manager.
3. Rebuild and redeploy frontend and backend from the latest tagged release.
4. Smoke test `/health`, admin login, and contact submission paths.
