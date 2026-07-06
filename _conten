This extension syncs orders, clients, and products from [Prom.ua](https://prom.ua) into Zoho CRM.

---

## Requirements

| Item | Details |
|------|---------|
| **Prom.ua account** | Active seller account with API token from the Prom seller cabinet |
| **Zoho CRM edition** | Standard or higher (see [Edition compatibility]({{ '/' | relative_url }}#edition-compatibility)) |
| **Inventory module** | Required only if you sync to **Sales Orders** with line items or sync **Products** |
| **One-time Zoho authorization** | Grants the extension permission to write CRM data in the background (scheduled sync) |

---

## Setup

1. Open **Settings → PromSync for Zoho CRM** in Zoho CRM.
2. Click **+ Add Connection** and enter your Prom.ua API token.
3. Click **Test Connection** to validate the token.
4. Configure field mapping and sync frequency (**Every ~5–10 minutes**, **~15 minutes**, **~hour**, or **Manual only**).
5. Complete the one-time **Authorize Zoho** step in the setup wizard.

If the token is invalid, you will see:

> *Invalid Prom.ua API token. Open connection settings, enter the correct API token from your Prom seller cabinet, and save.*

---

## Sync Dashboard

### Sync scope

| Mode | What it does |
|------|--------------|
| **Orders from date** | Orders **created** on Prom from the selected **From date**. Optional **To date** — leave empty to sync until now. |
| **New since last sync** | Orders **modified** on Prom after the last successful sync. |

There is no “sync all orders ever” mode — only these two options.

### Full catalog scan (checkbox)

**Full catalog scan — all products & clients from Prom**

| Checkbox | Behavior |
|----------|----------|
| **Off** | Orders follow the selected scope. Clients and products that **changed** on Prom since the last sync are updated incrementally. |
| **On** | Additionally performs a full scan of **all** Prom clients and products. Slower on large catalogs — use for initial import or full re-sync. |

Without the checkbox, new clients/products that never appear in an order will only sync when Prom marks them as changed (background incremental sync) or when you run a full catalog scan.

### Sync Now

Runs sync immediately with the selected options. When finished, the widget shows counts of created/updated orders, contacts, and products.

---

## Background sync (cron)

If sync frequency is **5m**, **15m**, or **1h**, Catalyst runs sync automatically in the background.

**Manual only** — sync runs only when you click **Sync Now**.

Each cron cycle:

1. **Orders** — modified on Prom since the last successful sync.
2. **Clients** — modified in the Prom catalog (incremental).
3. **Products & stock** — modified in the Prom catalog; stock updates `Qty_in_Stock` in CRM.

### What updates on repeat sync

| Entity | Updated on repeat sync? |
|--------|-------------------------|
| **Orders** | Yes — Prom status, amount, line items, buyer |
| **Contacts / Accounts** | Yes — data from Prom (phone stored without leading `+`) |
| **Products** | Yes — name, price, SKU, **stock quantity** |

Deal **Stage** is set only when the order record is **first created** (per your field mapping). Prom order status is stored in **Prom Status** (`prom1__Prom_Status`) and updated on every sync.

Order currency in CRM is always **UAH**.

---

## Messages after sync

### Success

Example: *3 order(s) created, 2 order(s) updated, 5 contact(s) created, 12 product(s) synced*.

### Long sync (CRM widget timeout)

If sync takes longer than the Zoho CRM widget limit (~30–45 seconds), you may see:

> *Sync has been scheduled. Refresh the page and check new records.*

This is **not a sync failure** — processing may continue on the server. Refresh after a minute and check CRM records and **Prom Sync Logs**.

Technical errors such as *Execution Time Exceeded* are not shown to end users.

---

## After an interrupted sync

There is **no resume from checkpoint** — the next run starts from the beginning.

- Records already in CRM are **not duplicated** — they are updated or skipped (idempotent upsert).
- You can click **Sync Now** again to process remaining items.

For large catalogs (thousands of clients/products): use **Orders from date** in batches or run **Full catalog scan** during off-peak hours. For daily use, **5–15 minute** background sync is usually enough.

---

## Logs

Per-run details are in the **Prom Sync Logs** module in CRM (linked to your connection).

---

## FAQ

**Why is product stock outdated in CRM?**  
Check that background sync is enabled (not Manual only) and the connection status is **Active**. Stock updates when the product changed on Prom and was picked up by incremental sync.

**Why is a new Prom client missing in CRM?**  
If there is no order with that client, wait for a catalog change (background sync) or run sync with **Full catalog scan**.

**Prom status changed but Deal Stage did not.**  
Stage is set only on create. Prom status is in **Prom Status** and updates on the next sync.

**Do I need a separate Prom.ua subscription?**  
Yes. This extension connects to your existing Prom.ua seller account. Prom.ua fees are separate from Zoho CRM and this extension.

---

## Support

Use **Contact support** in the widget (Settings → PromSync for Zoho CRM). You can also reach Salesjam at the contact details listed on the marketplace listing.

---

## Related documents

- [Privacy Policy]({{ '/privacy/' | relative_url }})
- [Terms of Service]({{ '/terms/' | relative_url }})
