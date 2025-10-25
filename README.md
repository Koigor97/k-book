## Executive Summary

KBook is a digital logbook platform purpose-built for Sierra Leone’s ministries, schools, and clinics to capture visitor activity even when power or connectivity drops. It tackles the everyday chaos of paper logs and unreliable apps by guaranteeing offline-first reliability, quick receptionist workflows, and compliance-grade records that survive outages. Our initial rollout targets frontline reception teams and site administrators who juggle high visitor volume, limited technical training, and strict oversight mandates. By combining configurable visit types, transparent audit trails, and lightweight reporting, KBook delivers trust, accountability, and rapid feedback loops so pilot organizations can prove impact without custom builds.

## Problem Statement

Across Sierra Leone’s ministries, schools, and clinics, visitor activity is still captured in paper logbooks or fragile spreadsheets that collapse under power cuts and spotty internet. Receptionists scramble to re-enter data after outages, administrators lose visibility into who is onsite, and compliance reviews stall because records are incomplete or inconsistent. Existing digital tools demand constant connectivity, lack contextual configuration for multi-department pilots, and fail to provide trustworthy audit trails. With donor reporting and oversight tightening, organizations cannot afford another unreliable system, making a resilient, locally attuned solution urgent.

## Proposed Solution

KBook delivers an offline-first digital logbook that frontline staff can trust even when power or connectivity disappears. Receptionists authenticate quickly via PIN, capture visitor details with configurable dropdowns, and see clear status cues for saved, syncing, or backlogged entries. Administrators get a unified dashboard with weekly snapshots, searchable audit trails, and print-ready exports tailored for compliance reviews. By combining a shared configuration model with lightweight training materials, backfill workflows, and rapid feedback loops, KBook positions itself as the simplest way for ministries, schools, and clinics to modernize visitor records without bespoke builds.

## Developer Quickstart

- Install dependencies once with `pnpm install`.
- Start the local Supabase stack whenever you need Postgres and edge functions via `pnpm start-supabase` (Ctrl+C to stop or run `pnpm stop-supabase`).
- Launch the receptionist/admin app with `pnpm dev` (runs the `apps/web` SvelteKit workspace).
- Run focused commands per workspace:
  - `pnpm --filter web test:unit` for vitest checks on routes/services.
  - `pnpm --filter web test:e2e` for Playwright smoke tests.
  - `pnpm --filter worker test` for TypeScript + lint validation of Supabase edge code.
- Call the platform health endpoint locally at `http://localhost:5173/api/health` to verify Supabase connectivity before pushing changes.

### Workspace Layout

- `apps/web` — SvelteKit receptionist/admin shell with Tailwind 4 + shadcn plumbing.
- `apps/worker` — Supabase edge functions, migrations, and CLI scripts.
- `packages/shared` — Shared domain types including health-check response contracts.
- `packages/offline-core` — Offline sync queue placeholder wired into future reception UI.
- `packages/config` — Central ESLint and TypeScript presets consumed by every workspace.

### Environment Files

- Copy `.env.example` to `.env` and `.env.local.example` to `.env.local` at the repository root (the SvelteKit app is configured via `kit.env.dir = '..'` to read root env files).
- Health checks rely on `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; without them `/api/health` returns a `503` so CI surfaces misconfiguration.

### CI/CD Overview

- `.github/workflows/ci.yml` runs linting, type checks, worker tests, vitest specs, and Playwright e2e on every push/PR.
- `.github/workflows/deploy.yml` publishes preview deployments for pull requests and promotes to production on `main`, then deploys Supabase functions via the CLI.
- Provide `VERCEL_*`, `SUPABASE_*`, and `SUPABASE_ACCESS_TOKEN` secrets in the repository settings before enabling the deploy workflow.

## Target Users

### Primary User Segment: Reception Staff at Ministries, Clinics, and Schools

- Diverse mix of mid-level civil servants, school office clerks, and clinic intake nurses aged 25–45 working in Freetown and regional hubs.
- Manage high visitor throughput on shared tablets or desks, often in spaces with frequent outages and limited IT support.
- Need rapid check-in flows, configurable visit reasons, and visible offline/sync cues so they trust each entry is saved.
- Aim to process visitors quickly, maintain accurate logs, and avoid rework when supervisors audit their books.

### Secondary User Segment: Site Administrators and Department Directors

- Senior administrators, heads of department, or compliance officers accountable for reporting to ministries, donors, or boards.
- Review daily/weekly summaries remotely, track queue bottlenecks, and ensure data integrity across multiple service desks.
- Need search-first dashboards, exportable reports, audit trails, and the ability to tweak visit types without filing IT tickets.
- Goal is to demonstrate transparency, surface operational patterns, and defend program impact during audits.

## Goals & Success Metrics

### Business Objectives

- Increase verified visitor logging compliance across pilot sites to ≥95% within the first 90 days.
- Demonstrate offline capture reliability with <2% unsynced entries during outages across all pilots.
- Secure at least two ministry and one clinic testimonial citing improved accountability within six months.

### User Success Metrics

- Receptionists complete standard check-ins in under 45 seconds even during low-connectivity scenarios.
- Site administrators export weekly compliance reports with ≤1 support request per month.
- At least 80% of frontline staff report confidence in offline status indicators during post-pilot survey.

### Key Performance Indicators (KPIs)

- Daily Active Receptionists: number of unique staff logging entries vs total onboarded, target ≥70% adoption.
- Sync Recovery Time: median time to reconcile offline entries after connectivity returns, target <10 minutes.
- Audit Trail Completeness Score: percentage of entries with intact metadata (user + timestamp) across pilots, target ≥98%.

## MVP Scope

### Core Features (Must Have)

- **Offline Log Capture:** PIN-based receptionist login, auto-clearing forms, and visible sync/offline badges so staff trust entries survive outages.
- **Configurable Visit Metadata:** Admin-managed dropdowns for visitor type, reason, and department to support multi-site pilots without custom builds.
- **Backfill & Fallback Workflow:** “Add Past Entry” flow plus documentation for paper-log procedures to recover from prolonged downtime.
- **Who’s Here Now View:** Real-time list with manual refresh and wait-time cues for receptions and supervisors during busy periods.
- **Search & Export Hub:** Admin console prioritizing quick search, basic filters, and PDF/CSV export to satisfy compliance reporting.
- **Audit Trail & Activity Logs:** Immutable records showing who logged each entry and key status changes for accountability.

### Out of Scope for MVP

- Advanced analytics dashboards (trend charts, predictive insights).
- Integrated SMS/email notifications or visitor alerts.
- Biometric or ID card scanning for identity verification.
- Hardware provisioning or device management tooling.
- Deep localization (multi-language UI beyond baseline terminology).

### MVP Success Criteria

MVP succeeds when pilots in at least two sectors run uninterrupted check-ins for four consecutive weeks, maintain ≥95% sync integrity even with daily outages, and collect positive testimonials from both receptionists and administrators about ease of use, configurability, and reporting readiness.

## Post-MVP Vision

### Phase 2 Features

- Queue and wait-time insights with historical trends so clinics and ministries can rebalance staffing.
- Multi-site analytics dashboard combining ministry, school, and clinic pilots while keeping sync health telemetry front and center.
- Guided onboarding and in-app training modules so new receptionists build trust in offline status cues.

### Long-term Vision

Position KBook as the trusted visitor management layer for West African public services—plugging into identity systems, enabling policy-aware access control, and rolling data up to national oversight dashboards without sacrificing offline resilience.

### Expansion Opportunities

- Premium success tiers that bundle dedicated onboarding, training refreshers, and rapid-response support for high-stakes sites.
- Integration connectors (e.g., secure exports to ministry CRMs, donor reporting tools, national ID registries) that deepen KBook’s footprint without owning hardware.
- Sector-specialized templates and implementation toolkits distributed through local partners to accelerate rollout in new regions.

## Technical Considerations

### Platform Requirements

- **Target Platforms:** Android tablets (Android 9+) and mid-range Windows laptops running Chrome/Edge in kiosk mode; optimize for touch-first, low-spec hardware with intermittent power.
- **Browser/OS Support:** Chrome/Chromium-based browsers with PWA install capability; baseline Safari/iPadOS support for leadership review; enforce kiosk lockdown guidance for shared devices.
- **Performance Requirements:** Sub-1.5s form loads on cold start, <100KB per sync burst, graceful degradation to local cache with battery-aware sync backoff.

### Technology Preferences

- **Frontend:** SvelteKit + TypeScript with service-worker powered offline caching; Tailwind for rapid UI iterations; Playwright for end-to-end kiosk regression.
- **Backend:** Supabase (Postgres + Auth + Storage) with row-level security, edge functions for sync reconciliation, cron-driven cleanup.
- **Database:** Postgres schemas partitioned by tenant/pilot, JSONB config tables for visit taxonomy, audit triggers for entry provenance.
- **Hosting/Infrastructure:** Supabase managed stack plus Vercel (staging) and Fly.io (pilot) for geo-proximity; Cloudflare for DNS and edge caching; nightly backups pinned to EU/West Africa-friendly region.

### Architecture Considerations

- **Repository Structure:** Monorepo with `apps/web` (SvelteKit) and `packages/shared` for schema/types; align with existing coding standards doc for linting/test setup.
- **Service Architecture:** Offline-first client handles optimistic writes; Supabase handles authentication, RLS, and conflict resolution via edge functions; optional webhook bridge for reporting exports.
- **Integration Requirements:** REST/CSV export endpoints for ministry CRMs, donor portals; potential webhook stubs for future notification layer; audit exports signed for tamper evidence.
- **Security/Compliance:** Enforce PIN policy with lockouts, encrypt local IndexedDB cache, enable activity logging for Supabase access, conform to Sierra Leone data residency expectations via regional hosting notes.

## Constraints & Assumptions

### Constraints

- **Budget:** MVP development constrained to lean internal resources; assumes clients handle hardware procurement and site readiness.
- **Timeline:** Pilot-ready MVP targeted within two sprints, followed by a four-week stabilization window before expansion discussions.
- **Resources:** Lead student developer operating mostly solo with occasional mentor check-ins; UX/design and QA support pulled ad hoc, so scope must stay tightly focused.
- **Technical:** Reliant on Supabase regional availability and kiosk lockdown policies at client sites.

### Key Assumptions

- Pilot organizations secure compatible tablets or laptops and enforce kiosk usage policies.
- Offline telemetry and sync metrics can be captured without regulatory hurdles.
- Local leadership buys into lightweight training and fallback procedures.
- Existing Supabase stack meets government data residency expectations once documented.

## Risks & Open Questions

### Key Risks

- **Offline Sync Breakdown:** Conflict handling or prolonged outages could corrupt backfilled entries, eroding trust with compliance officers.
- **Training Adoption Gap:** Receptionists may revert to paper if status cues, SOPs, or refresher support lag.
- **Data Residency/Policy Changes:** Government mandates may restrict Supabase regions or require additional certifications mid-pilot.
- **Single-Developer Bandwidth:** Solo build plus stabilization may slip if bugs or new requirements surface late.
- **Device/Kiosk Drift:** Client-managed hardware without enforced kiosk policies risks unauthorized apps or tampered settings.

### Open Questions

- Who monitors sync health across multiple pilot sites and how quickly can issues be escalated?
- What governance ensures shared tablets stay in kiosk mode between shifts?
- Which local partners or ministries can vouch for pilots to build credibility?
- How do we quantify MVP success in a way that convinces donor auditors?

### Areas Needing Further Research

- Data residency commitments from Supabase and fallback options if stricter policies emerge.
- Optimal training formats (in-person workshops vs. video vs. quick-reference cards) for frontline staff.
- Queue analytics requirements to define Phase 2 scope realistically.
- Offline telemetry tooling to observe sync performance without violating regulations.

## Appendices

### A. Research Summary

- 2025-10-23 brainstorming session surfaced 80 ideas emphasizing offline resilience, configurability, and rapid training/fallback procedures.
- Role-playing and scenario analyses confirmed audit trails, sync visibility, and paper-log recovery as make-or-break adoption factors.
- Question storming highlighted compliance reporting, device governance, and pilot credibility needs across ministries, schools, and clinics.
