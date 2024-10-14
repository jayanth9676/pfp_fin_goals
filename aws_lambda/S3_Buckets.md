# S3 Buckets

## user-documents

This bucket stores user-related documents.

### Structure:
- /{userId}/
  - financial-statements/
    - {year}-{month}.pdf
  - receipts/
    - {transactionId}.jpg

## app-assets

This bucket stores static assets for the application.

### Structure:
- /images/
  - logos/
  - icons/
- /documents/
  - terms-of-service.pdf
  - privacy-policy.pdf
- /educational-content/
  - financial-literacy/
    - module1.pdf
    - module2.pdf