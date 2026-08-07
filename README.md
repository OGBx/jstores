# J-Stores Foot Massager

Mobile-first Next.js storefront and secured order-management dashboard for J-Stores.

## Local development

1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env` and configure every required value.
3. Run `npm install`.
4. Run `npx prisma migrate deploy`.
5. Run `npm run dev`.

The admin dashboard is available at `/admin`. Never commit `.env` or disclose production admin credentials.

## Required production environment variables

- `DATABASE_URL`: pooled managed PostgreSQL connection string.
- `DIRECT_URL`: direct PostgreSQL connection used only by Prisma migrations.
- `ADMIN_EMAIL`: administrator sign-in email.
- `ADMIN_PASSWORD_HASH`: bcrypt hash with each `$` escaped as `\$` in local Next.js env files.
- `ADMIN_SESSION_SECRET`: at least 32 cryptographically random bytes.
- `NEXT_PUBLIC_SITE_URL`: canonical HTTPS origin, such as `https://jstores.com.ng`.

Optional:

- `ORDER_NOTIFICATION_WEBHOOK_URL`: HTTPS endpoint receiving an `order.created` JSON payload. Connect this to an automation provider for email, Slack, Teams or another staff alert channel.

## Deployment

1. Push the repository without `.env`, `.next`, logs or `node_modules`.
2. Provision managed PostgreSQL with connection pooling, automated backups and point-in-time recovery where available.
3. Add production environment variables in the hosting dashboard. Generate new production secrets; do not reuse local credentials.
4. Run `npm run migrate:deploy` against production from a controlled migration job or administrator machine.
5. Deploy with `npm run build`; application builds do not mutate the production database.
6. Confirm `/api/health` returns HTTP 200.
7. Place a complete test order and confirm dashboard, notification, status update and CSV export.

## Hosting-account configuration

These controls cannot be enabled from application source and must be configured with the hosting provider:

- Add a firewall rate-limit rule for `POST /api/orders` and enable managed bot challenges.
- Configure uptime monitoring against `/api/health`.
- Configure application error alerts and database storage/connection alerts.
- Verify automated database backups and perform a test restore before launch.
- Add the domain to Google Search Console and submit `/sitemap.xml`.

## Operations

- Order status changes create an audit event.
- Detailed notes and courier references are stored on each order at `/admin/orders/{orderId}`.
- CSV exports respect the current search and filters.
- Only publish reviews received from real customers with permission; no sample reviews are included.
- Have the policy pages reviewed for the applicable Nigerian consumer and privacy requirements.
