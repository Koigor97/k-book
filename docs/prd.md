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

### Target Device and Platforms: Web Responsive

Assumed a responsive web app that runs well on 10-inch tablets, low-cost laptops, and desktop kiosks to cover mixed hardware across pilot sites.
