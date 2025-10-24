k-book Product Requirements Document (PRD)
==========================================

## Goals and Background Context

### Goals

- Deliver an offline-first visitor logging experience that reception staff trust through clear sync status cues and resilient data capture.
- Provide administrators with compliance-ready exports, audit trails, and weekly summaries tailored to ministry, school, and clinic oversight needs.
- Enable configurable visit metadata so multi-site pilots avoid bespoke builds while reflecting local workflows.
- Reduce check-in time to under 45 seconds and keep unsynced entries below 2% during outages to prove operational reliability.
- Equip pilot organizations with backfill workflows and training support so staff never revert to paper during outages.

### Background Context

KBook targets ministries, clinics, and schools in Sierra Leone that still rely on paper logs or fragile spreadsheets, leaving them exposed when power and internet fail. Receptionists juggle high visitor volume with little IT support, while administrators lack timely visibility and trustworthy audit trails that donors and regulators now expect.

The platform proposes an offline-first logbook with PIN authentication, configurable visit types, and visible sync status so frontline staff regain confidence that entries persist through outages. Administrators receive dashboards, search-first exports, and audit trails aligned to compliance workflows, all without custom builds. Combined with training, backfill SOPs, and feedback loops, KBook positions itself as the simplest path to modernize visitor records across pilot organizations.

### Change Log

| Date       | Version | Description                 | Author |
|------------|---------|-----------------------------|--------|
| 2025-10-23 | v0.1    | Initial PRD draft creation. | John   |

## User Insights Summary

- **Primary Reception Staff Persona:** Mid-level civil servants, school clerks, and clinic intake nurses (ages 25–45) working in outage-prone environments. They need sub-45-second check-ins, clear offline/sync cues, and confidence that entries survive downtime.
- **Secondary Administrators Persona:** Site administrators and department directors responsible for compliance reporting. They require search-first dashboards, exportable audit trails, and configurable metadata to avoid IT tickets.
- **Research & Market Signals:** `docs/brief.md` captures brainstorming and scenario analysis confirming auditability, sync visibility, and fallback procedures as adoption blockers for existing tools. Competitive gap lies in offline-first reliability plus rapid configurability tailored to Sierra Leone pilots.
- **Success Benchmarks:** MVP aims for ≥95% verified logging compliance, <2% unsynced entries, <45s check-ins, and testimonials from at least two ministries/one clinic within six months. Pilots must run four uninterrupted weeks across two sectors to graduate.

## Requirements

### Functional

1. FR1: Reception staff must capture visitor entries entirely offline with automatic sync retries and visible status cues so trust is maintained during outages.
2. FR2: The system must authenticate receptionists via quick PIN login and enforce role-based permissions for admins reviewing dashboards.
3. FR3: Administrators must configure visit metadata (reason, department, visit type) without code changes and have those choices flow to receptionist forms immediately after sync.
4. FR4: Provide “Who’s Here Now” and historical search views with exportable audit trails so compliance officers can trace visitor activity across sites.
5. FR5: Support backfill workflows for past visits plus guided paper-log recovery steps, ensuring paper entries can be digitized after prolonged downtime.

### Non Functional

1. NFR1: Ensure offline data loss remains below 2% of entries across pilots, with conflict resolution that preserves authoritative audit history.
2. NFR2: Recover and sync backlog entries within 10 minutes of connectivity return under typical pilot network conditions.
3. NFR3: Maintain ≥98% audit trail completeness, recording user, timestamp, and source device metadata for every entry and export.
4. NFR4: Allow deployment to compliant Supabase regions and document controls needed to satisfy evolving government data residency policies.

**Verification Approach:** Track sync failure rate, audit completeness, and recovery time via telemetry events emitted from the client and summarized in admin dashboards; weekly pilot reviews validate testimonial goals and compliance adoption.

## User Interface Design Goals

### Overall UX Vision

Deliver a calm, confidence-building interface that makes offline status unmistakable and minimizes cognitive load for busy receptionists. The design favors large tap targets, progressive disclosure, and bilingual-ready text so staff with varying tech comfort can complete check-ins quickly even on shared tablets.

### Key Interaction Paradigms

- Offline-first status indicators pinned to the header or footer with color plus icon language so staff never question whether data saved.
- Step-by-step receptionist flow with optional keyboard shortcuts for desktop kiosks, keeping primary actions in a single column for thumb reach.
- Admin dashboards using a search-first layout with saved filters and quick export actions, optimized for laptop review but still responsive.

### Core Screens and Views

- Reception Check-In Flow (visitor details, visit reason, sync status).
- Who’s Here Now dashboard with manual refresh and wait-time cues.
- Backfill Past Entry wizard guiding paper-to-digital capture.
- Admin Compliance Hub: search, filters, exports, audit trail detail view.
- Configuration Console for visit metadata and staff PIN management.

### Accessibility: WCAG AA

Assumed WCAG AA as the baseline to ensure legible contrast and screen-reader compatibility; flagged bilingual and localization support as a future enhancement.

### Branding

Assumed minimalist, neutral branding with government-compatible palette (deep blues or greens) and the ability to skin with ministry logos later; needs confirmation if donor or ministry mandates specific colors or emblems.

**Branding Confirmation:** Stakeholders approved a neutral emerald/charcoal palette with ministry logo lockups per site; localization limited to English with glossary support for common terms (no full multilingual UI in MVP).

### Target Device and Platforms: Web Responsive

Assumed a responsive web app that runs well on 10-inch tablets, low-cost laptops, and desktop kiosks to cover mixed hardware across pilot sites.

### Primary User Journeys

- **Receptionist Check-In Flow:** Arrive at PIN login → confirm offline/online status → capture visitor details (reason, department, notes) → submit and see sync state (queued/synced) → optionally view pending queue. Entry/exit points include login, shift logout, and emergency paper-hand-off.
- **Admin Oversight Flow:** Email/password login → land on dashboard with sync backlog alerts → review “Who’s Here Now” → drill into historical search → export CSV/PDF for compliance packages.
- **Backfill & Recovery Flow:** Choose “Add Past Entry” → enter paper log batch details → resolve conflicts → submit with paper reference → confirm audit trail update.

### Usability & Feedback Considerations

- Maintain sub-45-second check-in by minimizing required fields and enabling keyboard/touch parity; preload metadata locally.
- Surface inline error handling (e.g., duplicate visitor detection, missing required fields) with plain-language guidance suitable for varying technical literacy.
- Provide manual sync trigger and contextual tips so staff know when to escalate prolonged offline states; capture user feedback via quick sentiment prompts post-shift (deferred if time-constrained).
- Stakeholders confirmed communication preferences: bi-weekly PM updates via email summary, monthly pilot sync with ministry/clinic leads, and sign-off checkpoints before each epic kickoff.

### Edge Cases & Recovery Paths

- Prolonged offline periods beyond 24 hours use paper-log SOP with later backfill; system flags backlog counts to admins.
- Device swap or PIN lockout requires admin reset workflow and audit notation.
- Conflicting edits (e.g., duplicate visitor entries) resolved by preserving first write, alerting admin review, and logging reconciliation steps.

## Technical Assumptions

### Platform & Framework

- Web-first PWA built with SvelteKit and TypeScript, using shadcn-svelte components and Tailwind CSS so we can ship fast while keeping kiosk-friendly layouts consistent.
- Service worker owns offline caching and IndexedDB queue management, keeping receptionist workflows responsive without connectivity.

### Data & Backend

- Supabase (PostgreSQL, Auth, Storage) provides data, auth, and file storage; local development runs through Supabase CLI and Docker to mirror production.
- Clients use `@supabase/supabase-js` and `@supabase/ssr` SDKs, with IndexedDB persisting unsynced entries and background sync reconciling conflicts while preserving audit history.

### Repository Structure: Monorepo

- Single repo housing the SvelteKit app plus Supabase migrations and configuration keeps developer experience simple and supports Vercel + GitHub Actions automation.

### Service Architecture

- Monolithic SvelteKit application talking directly to Supabase services; serverless edge functions remain optional but not required in MVP, minimizing operational overhead.

### Testing Requirements

- Unit and integration coverage for SvelteKit routes, Supabase data access, and offline queue logic, plus targeted Playwright E2E smoke tests for kiosk flows and sync recovery.

### Additional Technical Assumptions and Requests

- No third-party email or SMS integrations in MVP; compliance exports generated server-side as CSV (csv-writer/PapaParse) and PDF (pdfkit).
- Primary deployment on Vercel with feature-branch GitHub Actions pipeline; Supabase-hosted Postgres acceptable given no current data residency constraints.
- Receptionists use PIN auth, admins use email/password via Supabase Auth; immutable audit tables and daily backups rely on Supabase defaults.
- Device management and kiosk enforcement handled by client operations; we document prerequisites but do not implement tooling.
- Capture client-side sync telemetry (offline duration, retry counts, latency) and surface internally rather than using third-party monitoring tooling.

### Technical Risks & Investigation Items

- Validate Supabase regional availability relative to Sierra Leone residency expectations; plan fallback if policies tighten.
- Prototype conflict resolution strategy for long-running offline queues to ensure no data loss beyond the 2% threshold.
- Size audit log storage and retention strategy to avoid performance degradation; confirm backup/restore drills before pilot.
- Investigate kiosk-hardening practices per device type (Android tablet vs Windows) to document prerequisites for clients.

### Technical Debt & Maintenance Approach

- Prioritize instrumentation and logging alongside feature work to avoid retrofit debt; document any deferred telemetry gaps.
- Defer advanced analytics and training modules intentionally, capturing debt in backlog with clear success triggers.
- Keep Supabase migrations incremental with rollback scripts; nightly backups verified during stabilization window.

## Scope Boundaries & Validation

### In-Scope (MVP Must Haves)

- Offline receptionist check-in with PIN auth, queue visibility, and sync indicators.
- Who’s Here Now dashboard, historical search, and compliance-ready CSV/PDF exports.
- Admin-managed visit metadata, backfill workflow, and basic telemetry summaries.
- Audit trail persistence with immutable logging and daily backups.

### Out of Scope (Deferred)

- Advanced analytics dashboards or predictive insights.
- SMS/email notifications, visitor alerts, or biometric capture.
- Hardware provisioning, kiosk enforcement tooling, or deep localization beyond baseline terminology.
- External monitoring services (e.g., Sentry) or automated device governance.

### Future Enhancements

- Queue analytics and trend reporting for staffing decisions.
- Multi-site rollups and telemetry heatmaps across ministries, schools, and clinics.
- Guided onboarding/training modules and potential integration connectors for donor or ministry systems.

### MVP Validation Plan

- Run pilots in at least two sectors for four uninterrupted weeks with ≥95% logging compliance and <2% unsynced entries.
- Capture qualitative feedback from receptionists and administrators via weekly check-ins; secure at least three testimonials within six months.
- Monitor sync recovery time (<10 minutes median) and audit completeness (≥98%) through telemetry dashboards and manual spot checks.
- Target timeline: MVP feature build across two sprints, followed by four-week stabilization before expansion decisions.

## Epic List

1. Epic 1: Foundation & Offline Reception Core – Stand up the SvelteKit + Supabase stack, deliver PIN-authenticated receptionist flow, and prove resilient offline capture with background sync.
2. Epic 2: Admin Oversight & Compliance Reporting – Provide “Who’s Here Now”, historical search, audit trails, and CSV/PDF exports so administrators can meet compliance expectations.
3. Epic 3: Configuration & Operational Resilience – Enable self-serve visit metadata management, backfill workflows, training artifacts, and sync telemetry to keep pilots running smoothly.

## Epic 1 Foundation & Offline Reception Core

Goal: Establish the SvelteKit + Supabase baseline, ship a kiosk-ready receptionist flow with PIN authentication, and validate offline capture with reliable sync so pilots can trust day-one operation.

### Story 1.1 Project Scaffold & Health Check

As a product team,
I want a SvelteKit + Supabase project scaffold with automated CI/CD and a health-check route,
so that we can iterate quickly and verify deployments stay stable.

Acceptance Criteria
1: Repository includes SvelteKit app, Supabase migrations, Tailwind + shadcn-svelte setup, and environment templates documented.  
2: GitHub Actions pipeline runs lint, unit tests, and deploys preview/production to Vercel on main merges.  
3: Health-check route and Supabase connectivity test confirm API/auth availability; failures alert in CI logs.  
4: Basic audit log table and first migration deployed successfully to Supabase project.

### Story 1.2 Receptionist Authentication & PIN Management

As a receptionist,
I want to access the kiosk via PIN and see my shift status,
so that only authorized staff can log visitors even when offline.

Acceptance Criteria
1: Admin can create/update reception staff with unique PINs in Supabase (via seed script or admin UI stub).  
2: Receptionist login screen validates PIN locally, then syncs session with Supabase when online; lockout after configurable failed attempts.  
3: Auth state persists offline with encrypted IndexedDB storage and auto-logout after inactivity threshold.  
4: Audit log records login/logout events with timestamp, user id, and device identifier.

Prerequisites: Story 1.1.

### Story 1.3 Offline Check-In Form & Queue

As a receptionist,
I want to capture visitor details even without connectivity,
so that visitor logs stay complete during outages.

Acceptance Criteria
1: Check-in form captures visitor name, contact, visit reason, department, arrival timestamp, and custom notes.  
2: Submissions store instantly in IndexedDB when offline; queued payload visible in “Pending Sync” panel.  
3: Sync process retries automatically when connectivity returns and surfaces per-entry status (queued, syncing, synced).  
4: Successful sync writes to Supabase with audit metadata and clears local queue; failed sync surfaces actionable error message.

Prerequisites: Stories 1.1, 1.2.

### Story 1.4 Offline Status Indicators & Canopy Dashboard

As a receptionist,
I want clear indicators of offline/online state and sync health,
so that I trust the system and know when supervisors need to intervene.

Acceptance Criteria
1: Header/footer banner clearly shows offline/online state using color, icon, and text; accessible per WCAG AA.  
2: Sync status badge surfaces pending entries count and last successful sync timestamp.  
3: “Canopy” kiosk dashboard summarizes shift stats (total check-ins, pending sync) and provides manual retry trigger.  
4: UX validated on 10-inch tablet and desktop kiosk resolutions with Playwright smoke test covering offline → online flow.

Prerequisites: Story 1.3.

Rationale  
- Sequenced stories take us from infrastructure to offline capture to trust-building indicators, matching MVP order of operations.  
- Each story creates deployable value: even Story 1.1 ends with a canary health-check; Stories 1.2–1.4 deliver the core receptionist experience.  
- Acceptance criteria reinforce auditability, accessibility, and sync resilience aligned with FR1–FR5 and NFR targets.

## Epic 2 Admin Oversight & Compliance Reporting

Goal: Give administrators real-time visibility into who is onsite, historical search with audit trails, and compliance-ready exports so oversight bodies gain immediate value.

### Story 2.1 Admin Authentication & Dashboard Shell

As an administrator,
I want a secure login and overview dashboard,
so that I can view operational status separate from receptionist access.

Acceptance Criteria
1: Email/password auth flow for admins with Supabase, including password reset via secure link.  
2: Role-based routing ensures admins access dedicated dashboard while receptionists remain in kiosk mode.  
3: Dashboard shell displays key stats (today’s check-ins, pending sync count) and highlights sites with sync backlog > N threshold.  
4: Admin actions recorded in immutable audit log with metadata consistent with Story 1.2.

Prerequisites: Epic 1 complete.

### Story 2.2 “Who’s Here Now” Live View

As an administrator,
I want to see current onsite visitors with manual refresh,
so that I can manage occupancy and respond to audits in real time.

Acceptance Criteria
1: Live view lists all active visits with arrival time, reason, department, and receptionist.  
2: Manual refresh and auto-refresh (configurable interval) pull latest data; offline fallback shows last synced snapshot.  
3: Staff can mark visitor departure, capturing checkout timestamp and optional notes.  
4: View respects role permissions and logs all state changes to audit trail.

Prerequisites: Story 2.1.

### Story 2.3 Historical Search & Audit Trail Explorer

As a compliance officer,
I want to search past visits and view detailed audit history,
so that I can respond to oversight requests quickly.

Acceptance Criteria
1: Search filters by date range, visitor name, visit reason, receptionist, and site.  
2: Result list shows visit metadata plus link to audit timeline (creation, edits, sync events).  
3: Audit timeline aggregates Supabase row history and local sync events, highlighting discrepancies.  
4: Export single visit and audit log as PDF summary for review.

Prerequisites: Stories 2.1, 2.2.

### Story 2.4 Compliance Export Suite

As an administrator,
I want to generate weekly CSV and PDF reports,
so that I can share compliance updates with ministries and donors.

Acceptance Criteria
1: Generate configurable date-range CSV exports using csv-writer/PapaParse with schema documented.  
2: PDF summary via pdfkit includes visit totals, unresolved sync items, and audit completeness score.  
3: Export jobs run server-side, stream to browser, and log generation metadata (user, timestamp, filters).  
4: Admin receives success/failure confirmation; failures provide actionable error messaging and stay retriable.

Prerequisites: Story 2.3.

Rationale  
- Admin journey mirrors need-to-know order: secure access, real-time view, historical audit, then exports.  
- Stories ensure we maintain audit integrity and align with FR4 and compliance metrics.  
- Deliverables remain deployable after each story, allowing incremental validation with stakeholders.

## Epic 3 Configuration & Operational Resilience

Goal: Empower admins to tailor visit metadata, recover from outages, and monitor system health so pilots stay resilient without engineering intervention.

### Story 3.1 Visit Metadata Management

As an administrator,
I want to manage visit reasons, departments, and visitor types,
so that receptionist forms stay aligned with local workflows without code changes.

Acceptance Criteria
1: Admin UI CRUD for metadata categories with validation and ordering controls; changes versioned in Supabase.  
2: Receptionist clients pull latest metadata on sync and cache offline; delta updates minimize payload size.  
3: Audit log captures who changed what and when; rollback to previous configuration available.  
4: Metadata changes trigger kiosk notification prompting manual refresh.

Prerequisites: Epic 2 complete.

### Story 3.2 Backfill & Paper Recovery Workflow

As a receptionist,
I want guided steps to digitize paper logs after extended outages,
so that we maintain complete records even when kiosk downtime occurs.

Acceptance Criteria
1: “Add Past Entry” wizard captures date/time window, visitor details, and paper reference id.  
2: Wizard enforces chronological consistency and flags conflicts (duplicate entries or overlaps).  
3: System tracks source (“paper backfill”) in audit log and reports counts in admin dashboard.  
4: In-app help surfaces SOP checklist for paper fallback, downloadable as PDF for print.

Prerequisites: Stories 3.1.

### Story 3.3 Training & Telemetry Insights

As a site lead,
I want quick training resources and visibility into sync health,
so that staff adoption remains high and issues are detected early.

Acceptance Criteria
1: Embedded training hub with video/link placeholders, quick-reference cards, and acknowledgement tracking per receptionist.  
2: Telemetry view aggregates offline duration, retry counts, and failed syncs per site; highlights thresholds needing escalation.  
3: Telemetry data sourced from client-side events (Story 1.4) and stored in Supabase for 90-day retention.  
4: Weekly digest (within app) summarizes key metrics and outstanding issues without external email integration.

Prerequisites: Stories 3.1, 3.2.

Rationale  
- Epic shores up configurability, recovery, and training—direct responses to risks in the brief.  
- Sequencing ensures metadata exists before backfill (needs dropdowns) and telemetry leverages prior data capture.  
- Stories continue to deliver standalone value, culminating in operational insights that prepare the team for wider rollout.

## Cross-Functional Requirements

### Data & Analytics

- Core entities: visitors, visits, visit metadata taxonomy, staff users, audit events, telemetry events, and training acknowledgements.
- Store visit/audit data in Supabase Postgres with tenant-aware schemas; retain raw audit logs for 12 months and aggregate telemetry for 90 days.
- Ensure exports include tamper-evident metadata (checksum or signature) to satisfy compliance stakeholders.

### Integrations & Data Exchange

- External systems limited to CSV/PDF exports in MVP; design export schema to align with ministry/clinic reporting templates.
- Provide REST endpoints for future webhook or CRM integrations but defer activation until post-MVP.
- Authentication for future integrations will reuse Supabase service roles; document required scopes.

### Operational & Support

- Deployment cadence: feature branches deploy to Vercel previews; main branch auto-deploys to production after CI pass.
- Environments: local (Supabase CLI), staging (Vercel + Supabase project), production (Vercel + Supabase project with backups).
- Monitoring: in-app telemetry dashboards surface sync health, backlog counts, and offline duration; manual review during stabilization window.
- Support readiness: capture SOPs for kiosk setup, paper fallback, and escalation paths; client responsible for hardware maintenance.

## Checklist Results Report

**Execution Mode:** Began section-by-section review, then switched to comprehensive summary at user request.  
**Executive Summary:**  
- Overall PRD completeness: ~90% with research insights, scope boundaries, and cross-functional coverage now embedded.  
- MVP scope appropriateness: Just Right — clear in/out lists plus validation plan anchor the MVP cut.  
- Readiness for architecture phase: Ready, pending minor clarity polish (stakeholder comms, optional visuals).  
- Remaining focus: confirm stakeholder communication cadence and finalize branding/localization directives.

### Category Statuses

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PASS    | — |
| 2. MVP Scope Definition          | PASS    | — |
| 3. User Experience Requirements  | PASS    | — |
| 4. Functional Requirements       | PASS    | — |
| 5. Non-Functional Requirements   | PASS    | Telemetry dashboards must verify metrics during pilots. |
| 6. Epic & Story Structure        | PASS    | — |
| 7. Technical Guidance            | PASS    | Monitor Supabase region policy changes during rollout. |
| 8. Cross-Functional Requirements | PASS    | — |
| 9. Clarity & Communication       | PARTIAL | Stakeholder comms/approvals still to be documented explicitly. |

### Top Issues by Priority

- **HIGH:** Stakeholder alignment plan captured (bi-weekly PM briefs, monthly pilot sync, epic sign-offs).  
- **MEDIUM:** Final branding/localization confirmed; add visual artifacts (site map, wireframes) as they are produced.  
- **LOW:** Monitor Supabase regional policy shifts and revisit telemetry dashboard design during pilot retrospectives.

### MVP Scope Assessment

- Scope now balances receptionist operations, compliance oversight, and resilience; defer telemetry digest or advanced analytics if capacity tightens.  
- Validation plan anchors pilot expectations (two sprints build + four-week stabilization) with clear graduation criteria.  
- Remaining complexity risks: conflict resolution UX and backfill wizard — keep under review during execution.

### Technical Readiness

- Stack, deployment, testing expectations, and risks documented; architect can proceed focusing on data schema, sync reconciliation, and backup cadence.  
- Technical debt approach (instrumentation first, deferred analytics) noted; revisit during sprint planning to ensure accountability.

### Recommendations

1. Maintain stakeholder log and update communication cadence as roles evolve; document outcomes from monthly pilot syncs.  
2. Add IA or wireframe references once UX team delivers assets to keep PRD aligned with visual direction.  
3. During pilot prep, ensure telemetry dashboards and SOPs are implemented to observe NFR metrics in real time.

**Final Decision:** READY FOR ARCHITECT.

## Next Steps

### UX Expert Prompt

“As ux-expert, review `docs/prd.md` for KBook. Focus on translating the User Interface Design Goals, primary flows (receptionist offline check-in, admin compliance reporting), and outstanding UX gaps into actionable wireframe or design brief recommendations. Highlight assumptions that still need validation with reception staff and administrators.”

### Architect Prompt

“As architect, use `docs/prd.md` to outline the system architecture for the KBook offline-first logbook. Emphasize the SvelteKit + Supabase stack, offline sync strategy, audit logging, and deployment/monitoring approach. Call out data model considerations (visitor entries, audit trails, telemetry) and any risks that need Product clarification before implementation.”
