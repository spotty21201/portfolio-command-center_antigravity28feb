# PRD — Nusantara Portfolio Command Center

## 1. Product summary
**Nusantara Portfolio Command Center** is a holding-level dashboard for an Indonesian conglomerate to monitor portfolio company health, detect risks early, and drive faster executive decisions.

The system is designed for **glanceability first** (what needs attention today) and **drill-down second** (why it changed, who owns it, what action is next).

**Prototype received (current state):** Vite + React + TypeScript, Tailwind UI, React Router, Recharts. Screens implemented: **Home (Group Overview), Portfolio, Company Detail, Initiatives, Risk & Compliance, Reports, Settings** with a global shell (sidebar + topbar), currency toggle, role toggle, and mock data.

---

## 2. Problem statement
Conglomerate leaders often rely on:
- fragmented monthly decks,
- inconsistent KPI definitions,
- late reporting,
- unclear ownership on issues.

This creates a structural lag between **signal → interpretation → decision → action**.

The Command Center reduces that lag by centralizing:
- portfolio KPIs vs plan,
- operational signals,
- risk/compliance status,
- initiatives progress,
- escalations queue.

---

## 3. Goals and non-goals
### Goals
1. **Daily executive visibility**: show top portfolio KPIs + ranked “Today’s Attention”.
2. **Faster intervention**: enable leaders to identify which company/metric is deteriorating and assign ownership.
3. **Single source of truth (v1)**: unify common definitions and data freshness indicators.
4. **Role-based experience**: CEO vs BU CEO vs Risk Officer (content emphasis changes).

### Non-goals (v1)
- Full ERP replacement.
- Full consolidation accounting engine.
- Automated decisioning without human review.
- Building connectors to every system on Day 1 (use a phased integration plan).

---

## 4. Target users and jobs-to-be-done
### Personas
1. **Group CEO**
   - Wants a daily view of portfolio health and escalations.
2. **Holding CFO / Strategy Office**
   - Wants performance vs budget, forecast confidence, and driver explanations.
3. **Risk & Compliance Officer**
   - Wants risk heatmaps, deadlines, incidents, and escalations.
4. **BU CEO / Company CEO**
   - Wants their company view with actions, blockers, and initiative tracking.

### Jobs-to-be-done
- “Tell me what needs attention today and why.”
- “Show which companies are drifting from plan, and how severe.”
- “For a company, show financial + ops + risk + initiatives in one place.”
- “Make ownership and next action explicit.”

---

## 5. Success metrics
**Adoption & usage**
- Weekly active executives (WAU) using Home + one drill-down.
- % of leadership meetings referencing the dashboard.

**Operational outcomes**
- Time-to-detect (TTD) for key issues reduced (baseline → target).
- Time-to-assign owner for escalations.
- % of stale data incidents.

**Data quality**
- Data completeness score per company.
- On-time reporting rate.

---

## 6. Information architecture
Global navigation (sidebar):
- Home
- Portfolio
- Company Detail (via portfolio click)
- Initiatives
- Risk & Compliance
- Reports
- Settings

Global topbar:
- Search (portfolio-wide)
- Last refresh indicator
- Data completeness indicator
- Currency toggle (IDR/USD)
- Role toggle (CEO / Risk Officer / BU CEO)
- Notifications icon

---

## 7. Functional requirements by module

### 7.1 Home — Group Overview
**Purpose:** Provide a daily portfolio snapshot with ranked attention items.

**Must have (v1)**
- KPI strip: Revenue YTD, EBITDA YTD, Net Profit, Cash, Net Debt, Capex, WC Days, Headcount.
- “Today’s Attention” list with severity (Red/Amber), owner, due date, short description.
- Portfolio Performance chart (Revenue vs Budget / EBITDA vs Budget toggles).
- Portfolio Mix by sector.
- Portfolio Heatmap (companies x metrics) with R/A/G scoring.
- “What changed since last week” digest (mock now; rules-based v1; AI-assisted later).

**Interactions**
- Click an escalation → opens a side panel with:
  - company link
  - metric context
  - last 3 points trend
  - owner + next action + due date

**Data freshness**
- Each widget should show last_updated timestamp.

---

### 7.2 Portfolio — All Companies
**Purpose:** Scan the portfolio, filter, sort, and open company drill-down.

**Must have (v1)**
- Table with search + filters:
  - Sector, Region, Status (Normal/Watch/Intervention), Owner, Data freshness.
- Columns (minimum): Revenue YTD, EBITDA Margin, Cash Days, Net Debt/EBITDA, Safety incidents, Compliance score, Overall health.
- Sort by any column.
- Row click → Company Detail.

**Nice to have (v1.1)**
- Bulk actions: Export CSV, Flag Watch, Assign owner.

---

### 7.3 Company Detail
**Purpose:** One company’s single truth across financial, cash, ops, risk, initiatives, and people.

**Tabs**
1. Performance
   - YTD/QTD/MTD vs Budget vs LY
   - Driver view: Volume/Price/Cost/FX (simplified v1)
   - Forecast summary + confidence + last updated
2. Cash & Capital
   - Cash runway, AR/AP aging, inventory days, capex burn
   - “Major payments calendar” (month-based)
3. Operations
   - Sector-specific KPI set (templates by sector)
   - Delivery / uptime / quality metrics
4. Risk & Compliance
   - Top risks + KRIs, audit findings, legal cases, licensing status
5. Initiatives
   - Active projects, milestone timeline, budget vs actual, blockers
6. People
   - Headcount trend, attrition, critical vacancies

**Common elements across tabs**
- Owner
- Next action
- Last updated
- “Create Decision Request” button (modal)

---

### 7.4 Initiatives / Transformation
**Purpose:** Track group-wide initiatives and company initiatives in one view.

**Must have (v1)**
- List + filters: company, sector, priority, status.
- Each initiative card:
  - status/health
  - budget vs actual
  - next milestone
  - key risk
  - decision required flag

**Nice to have (v1.1)**
- Timeline/Gantt or Kanban switch.

---

### 7.5 Risk & Compliance
**Purpose:** Central place for risks, deadlines, incidents, escalations.

**Must have (v1)**
- Risk register summary + Top 10
- Likelihood x Impact heatmap
- Compliance calendar: licenses, audits, reporting deadlines
- Incident tracker: safety/environment/regulatory
- Escalations queue with owner and timestamp

---

### 7.6 Reports / Exports
**Purpose:** Generate standardized packs.

**Must have (v1)**
- Templates:
  - Weekly CEO Brief (1–2 pages)
  - Monthly Holding Pack
  - Company Snapshot
- Export action buttons (prototype: stub; v1: PDF generation service)
- Data freshness and audit trail summary

---

### 7.7 Settings
**Purpose:** Configure behavior without engineering.

**Must have (v1)**
- Threshold management (cash days, leverage, margin deterioration, stale data)
- Role-based view toggles
- Currency display preference
- Sector KPI templates (admin only)

---

## 8. Alerts and scoring logic (v1)
**Alert types**
- Data freshness: last_updated > 7 days
- Cash: cash_days < 30
- Leverage: net_debt_to_ebitda > threshold (sector-specific optional)
- Margin: EBITDA margin down > X pts vs budget
- Compliance: compliance score < threshold OR deadline within X days

**RAG scoring (example)**
- Green: within thresholds
- Amber: approaching threshold (80–100% of limit)
- Red: breached threshold

**Ranking for “Today’s Attention”**
Score = Severity weight + Days overdue + Company materiality (revenue contribution) + Recency of change.

---

## 9. Data model (mock → real)
### Entities
- Company
- Sector
- KPI snapshot (by period)
- Operational KPI snapshot (sector-specific)
- Risk item / KRI
- Compliance item / deadline
- Incident
- Initiative / milestone
- Decision Request
- User / Role / Ownership

### Required fields (Company)
- id, name, sector, region, ownership%, currency, status
- revenueYTD, ebitdaYTD, netProfitYTD, cash, netDebt, capex, workingCapitalDays, headcount
- operationalKpis (key/value)
- riskScore, complianceScore
- lastUpdated, dataSource

### Data freshness and completeness
- completeness% per company per module (finance / ops / risk)

---

## 10. Permissions (role-based)
### Group CEO
- View all
- Create/approve decision requests (optional workflow)

### Risk Officer
- View all
- Edit risk register, incidents, compliance deadlines

### BU CEO
- View all companies (or limited by org policy)
- Edit their company updates, initiatives, owner fields

Admin (not in prototype)
- Configure thresholds, sector KPI templates, user management

---

## 11. UX / UI principles
- **Executive-first hierarchy**: highlight attention and deltas, not raw tables.
- **No dead numbers**: every metric should imply a state (OK/Watch/Issue) and a next action.
- **Drill-down consistency**: click any RAG cell → same side panel pattern.
- **Always show freshness**: last refresh + last updated at widget level.
- **Low cognitive load**: limit colors to states; avoid decorative clutter.

---

## 12. Technical notes (prototype → v1)
### Current prototype stack
- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Recharts
- Mock data in src/data/mockData.ts

### Recommended production architecture (v1)
- Frontend: Next.js/React (or keep Vite if preferred)
- API: Node/Express (already included) or serverless functions
- DB: Postgres (Supabase) or managed SQL (prototype includes better-sqlite3 but not ideal for prod)
- Auth: SSO (Azure AD/Okta) + RBAC
- ETL: phased connectors (CSV first → ERP/BI later)
- PDF generation: server-side renderer (Playwright/Puppeteer) or dedicated service

---

## 13. Roadmap
### v0 (current)
- Visual prototype with core screens and mock data.

### v1 (MVP with real usage)
- Auth + roles
- Real data ingestion (CSV or BI export) + data freshness
- Alerts engine (rules-based)
- Decision Requests workflow (basic)
- Export PDFs (Weekly CEO Brief + Company Snapshot)

### v1.1
- Initiative timeline + dependencies
- Audit trail
- Company-level commentary / weekly updates

### v2
- AI-assisted “What changed” summaries
- Anomaly detection
- Scenario mode (Base/Downside/Upside)

---

## 14. Open questions
1. Which portfolio entities are in scope first (top 10 by revenue, or all)?
2. KPI definitions: single standard across all sectors, or sector-adjusted?
3. Data source priority: ERP, BI warehouse, spreadsheets, or manual weekly updates?
4. Preferred cadence: daily refresh vs weekly consolidation?
5. Export format preference: A4 vs Letter; branding guidelines (logo lockup, typography).

---

## 15. Acceptance criteria (for v1 release)
- Home page loads < 2s on normal office Wi-Fi.
- Portfolio table supports search + sector filter + sorting.
- Company detail shows at least 3 tabs with real data (Performance, Cash, Risk).
- Alerts appear based on thresholds and link to relevant drill-down.
- Weekly CEO Brief exports to PDF with consistent layout and timestamps.
- Role toggle corresponds to permission and emphasis changes.

