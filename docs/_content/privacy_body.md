**Last updated:** July 6, 2026  
**Publisher:** Salesjam  
**Extension namespace:** `marketplace8.prom1`

This policy describes how **PromSync for Zoho CRM** (“Extension”) processes data when you install and use it.

---

## Summary

The Extension syncs data between **your Prom.ua seller account** and **your Zoho CRM organization**. Sync runs via a **Zoho Catalyst** backend operated by Salesjam (EU region). Some installer metadata is sent to Salesjam for onboarding and support. Support messages may be sent to **Zoho Desk**.

We do not sell customer data. Data is processed only to provide the Extension’s functionality and support.

---

## Data we process

### Data you provide

| Data | Where stored | Purpose |
|------|--------------|---------|
| Prom.ua API token | Zoho CRM (`Prom Connection` record) and Catalyst (encrypted at rest in Data Store) | Authenticate with Prom.ua API |
| Field mapping & sync settings | Zoho CRM | Configure sync behavior |
| Support ticket subject/message | Zoho Desk (via Catalyst) | Customer support |
| Partner promo code (optional) | Zoho CRM org variable | Partner attribution |

### Data synced from Prom.ua to Zoho CRM

| Data type | Examples |
|-----------|----------|
| Orders | Order ID, status, amount, line items, buyer reference |
| Clients | Name, phone, email, address |
| Products | Name, SKU, price, stock quantity |

This data is written to modules you configure (e.g. Deals, Sales Orders, Contacts, Products).

### Data from Zoho CRM

| Data | Purpose |
|------|---------|
| OAuth refresh token | Background sync without repeated user login (stored in Catalyst Data Store, keyed by org ID) |
| Org ID, org name | Link installation to your CRM account |
| Installer name, email, phone | Lead capture when you first add a connection (Salesjam internal CRM) |

### Automatically collected (technical)

| Data | Purpose |
|------|---------|
| Sync timestamps, run status, error messages | Sync logs in CRM and Catalyst |
| API request metadata (timestamps, counts) | Operations and troubleshooting |

---

## Third-party services

| Service | Role | Location |
|---------|------|----------|
| **Prom.ua** (`my.prom.ua`) | Source marketplace data | Ukraine |
| **Zoho CRM** | Destination CRM | Your Zoho data center |
| **Zoho Catalyst** (Salesjam project) | Sync engine, OAuth token storage, API orchestration | EU (`catalystserverless.eu`) |
| **Zoho Desk** | Support tickets | EU (Salesjam Desk org) |
| **Salesjam CRM** | Installer lead capture (publisher only) | Zoho CRM |

---

## Legal basis & authorization

- You authorize data transfer when you enter your Prom.ua API token and complete Zoho OAuth.
- Sync runs only for CRM organizations where the Extension is installed and the connection is **Active**.
- You can pause sync by setting the connection to **Paused** or frequency to **Manual only**.

---

## Data retention

| Data | Retention |
|------|-----------|
| Prom Connection & sync settings | Until you delete the connection or uninstall the Extension |
| Catalyst installation row | Until registration is deleted or Extension uninstalled |
| OAuth refresh token | Until revoked or Extension uninstalled |
| Prom Sync Logs in CRM | Per your CRM retention policies |
| Support tickets in Desk | Per Salesjam Desk retention policy |
| Installer lead in Salesjam CRM | Per Salesjam CRM policies |

---

## Security

- Prom API tokens and Catalyst API keys are transmitted over HTTPS.
- Catalyst endpoints require an API key (`X-Catalyst-Key`) for server-to-server calls from Deluge.
- CRM access uses Zoho OAuth with scoped permissions granted by your administrator.

---

## Your rights

Depending on your jurisdiction (including GDPR), you may have rights to access, correct, delete, or restrict processing of personal data.

- **CRM data:** manage records in Zoho CRM directly.
- **Connection & tokens:** delete the Prom Connection in the widget or uninstall the Extension.
- **Support / privacy requests:** contact Salesjam at the email on the marketplace listing.

---

## Uninstall

When you uninstall the Extension:

- Custom modules and fields created by the Extension may remain or be removed per Zoho’s extension uninstall behavior.
- Catalyst registration should be removed by the publisher; contact support if you need confirmation of backend data deletion.

---

## Changes

We may update this policy. The “Last updated” date will change. Continued use after updates constitutes acceptance of the revised policy.

---

## Contact

**Salesjam** — see Developer Details on the [Zoho Marketplace listing](https://marketplace.zoho.com/) or the support email provided in the submission form.
