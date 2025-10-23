**Session Date:** 2025-10-23
**Facilitator:** Business Analyst Mary
**Participant:** User

## Executive Summary

**Topic:** Focused MVP ideation for KBook, a digital logbook pilot for Sierra Leone ministries, schools, and clinics  

**Session Goals:** Define core user journeys, surface sector-specific value propositions, examine offline-first technical risks, and outline a pragmatic go-to-market path within MVP constraints.  

**Techniques Used:** Role Playing; Question Storming; What If Scenarios; Assumption Reversal  

**Total Ideas Generated:** 80

### Key Themes Identified:
- Reliability under unstable power and connectivity is the headline value proposition.
- Compliance-grade record integrity matters more than rich analytics for early adopters.
- Configurability (visitor types/reasons) enables multi-department pilots without custom builds.
- Simple training, visible status cues, and manual overrides build trust with frontline staff.
- Pilot success depends on lightweight reporting, rapid feedback loops, and local credibility.

## Technique Sessions

### Role Playing - ~30 minutes

**Description:** Embodied perspectives of receptionists, directors, school administrators, and clinic nurses to expose daily realities, must-haves, and anxieties.

#### Ideas Generated:
1. PIN-based receptionist login with instant post-submit toast, auto-clearing forms, and offline badges.  
2. Quick-turn tablet swivel flow that lets visitors type name/number while staff select visit metadata.  
3. Emergency paper logbook protocol plus “Add Past Entry” flow to backfill outages.  
4. “Who’s Here Now?” live list with wait-time cues and manual refresh control.  
5. Directors need weekly snapshot dashboards prioritising totals, top reasons, and department loads.  
6. Configurable dropdowns per department prove flexibility without new builds.  
7. School admins require remote visibility and arrival alerts for key visitor categories.  
8. Clinic staff rely on privacy-friendly rapid check-ins, queue indicators, and busy-period summaries.

#### Insights Discovered:
- Trust hinges on visible status indicators (offline saved, low battery, sync state).  
- Role-based confidence improves when audit trails show who logged which entry.  
- Frontline staff value cleanliness and speed as much as the data they capture.

#### Notable Connections:
- Training and fallback plans are as critical as software features for power-cut resilience.  
- A shared configuration model can satisfy ministries, schools, and clinics with one codebase.

### Question Storming - ~35 minutes

**Description:** Exhaustive question generation across user journeys, unique selling propositions, technical risks, and pilot go-to-market.

#### Ideas Generated:
1. Receptionist operational safeguards (PIN reset, lockouts, editable entries, offline status).  
2. Admin experience needs (setup flows, audit visibility, export formats, remote security).  
3. Sector-differentiated value prompts (ministries’ accountability, schools’ safety, clinics’ flow).  
4. Localization trust factors (training media, data sovereignty, pricing fit).  
5. Offline sync unknowns (conflict handling, storage limits, retry logic, battery impact).  
6. Security assurances (encryption layers, RLS, incident logging, data deletion).  
7. Infrastructure questions (tablet specs, deployment method, Supabase scaling).  
8. Targeting strategy (which orgs, key decision-makers, outreach channels).  
9. Pilot incentives (hardware, free periods, onboarding depth, exit offers).  
10. Success metrics and feedback loops (usage KPIs, survey cadence, fix turnaround).

#### Insights Discovered:
- Every core user journey depends on crystal-clear recovery paths and permission controls.  
- Differentiation must speak to local context—offline-first, audit trails, and simplicity.  
- Pilot design hinges on both operational readiness and measurable engagement signals.

#### Notable Connections:
- The same questions surfaced across sectors, reinforcing the need for unified but configurable tooling.  
- Technical risk questions inform both MVP scope and the pilot measurement plan.

### What If Scenarios - ~20 minutes

**Description:** Stress-tested MVP plans against outages, approval hurdles, competitive entrants, and low dashboard engagement.

#### Ideas Generated:
1. Prolonged power cuts trigger a trained paper-log fallback, battery alerts, and backfill workflows.  
2. Multi-department ministry proof delivered via dual pilots using configurable dropdowns.  
3. Positioning against feature-heavy competitors by emphasising offline reliability and simplicity.  
4. If admins skip dashboards, empower reception with snapshot views and printables to relay value.

#### Insights Discovered:
- MVP trust derives from procedures (alerts, backfills) as much as app capabilities.  
- Configuration storytelling can satisfy demanding oversight bodies without added complexity.  
- Value communication must adapt to the information pathways people actually use.

#### Notable Connections:
- Offline resilience and simplicity of rollout double as marketing differentiators.  
- Competitive positioning feeds directly into go-to-market messaging and training assets.

### Assumption Reversal - ~15 minutes

**Description:** Challenged the belief that analytics drive adoption by envisioning a compliance-first motivator.

#### Ideas Generated:
1. Re-oriented dashboard to a verification hub with dominant search, recent activity, and quick exports.  
2. Elevated audit trail transparency and “verified entry” flags over trend charts.  
3. Reframed value proposition around tamper-evident records and instant lookup.  
4. Prioritised printable daily logs and rapid certification features before advanced analytics.

#### Insights Discovered:
- Early adopters may judge success by proof of control, not insight depth.  
- Lean MVP can defer complex analytics while still delivering compelling value.

#### Notable Connections:
- Compliance framing aligns with ministry expectations and medical confidentiality needs.  
- Simplified admin experience dovetails with observations from role-playing and what-if scenarios.

## Idea Categorization

### Immediate Opportunities
1. **Offline Status & Manual Refresh Indicators**  
   - Description: Prominent icons and a manual refresh button to reassure staff about sync state.  
   - Why immediate: Directly addresses frontline trust issues surfaced by every persona.  
   - Resources needed: UI design, state management hooks, basic iconography.
2. **Emergency Paper Log Fallback Kit**  
   - Description: Standardised paper form + training script plus “Add Past Entry” mode in KBook.  
   - Why immediate: Ensures continuity during unavoidable power failures.  
   - Resources needed: Template design, knowledge base entry, backlog ticket for backfill UX.
3. **Configurable Visitor Metadata**  
   - Description: Admin interface for managing visitor types/reasons per organisation or department.  
   - Why immediate: Enables multi-sector pilots without custom builds.  
   - Resources needed: Simple CRUD UI, Supabase tables with RLS, seed defaults.

### Future Innovations
1. **Automated Digest Summaries**  
   - Description: Scheduled email/PDF summaries with key visit counts and flags.  
   - Development needed: Background job scheduling, templating, email delivery integration.  
   - Timeline estimate: Post-pilot iteration (4–6 weeks) once usage patterns validated.
2. **Queue & Wait-Time Insights**  
   - Description: Real-time wait indicators and historical wait analytics for clinics and busy ministries.  
   - Development needed: Additional data capture, metrics computation, live dashboard components.  
   - Timeline estimate: Medium-term roadmap (2–3 sprints) after MVP stabilisation.

### Moonshots
1. **Secure Visitor Identity Verification**  
   - Description: Optional biometric or ID-card scanning layered atop the logbook for high-security sites.  
   - Transformative potential: Positions KBook as a comprehensive access management solution.  
   - Challenges to overcome: Hardware dependencies, privacy regulations, significant UX complexity.

### Insights & Learnings
- Offline-first reliability is the defining differentiator: every stakeholder cited it as non-negotiable.  
- Analytics should launch as simple search/export tools; deeper insights can wait.  
- Training, cues, and fallback processes are critical to tech acceptance in low-resource settings.  
- Pilot credibility hinges on localised support, testimonials, and transparent data stewardship.

## Action Planning

### #1 Priority: Offline Trust Experience
- Rationale: Confidence in data capture during outages underpins receptionist adoption and pilot success.  
- Next steps: Design status indicators, specify battery warning logic, draft fallback SOP.  
- Resources needed: UX/design time, frontend engineering, knowledge base authoring.  
- Timeline: Ready for MVP delivery (current sprint + QA).

### #2 Priority: Configurable Visitor Framework
- Rationale: Enables multi-department pilots and sector tailoring without code forks.  
- Next steps: Define data model, implement admin CRUD UI, create starter templates for each sector.  
- Resources needed: Supabase schema update, SvelteKit UI, documentation.  
- Timeline: Within MVP build cycle (1–2 sprints).

### #3 Priority: Search-Centric Admin View
- Rationale: Delivers immediate compliance value even if analytics adoption is slow.  
- Next steps: Prototype verification hub layout, validate filters, prioritise export/print actions.  
- Resources needed: Product design, frontend dev, PDF/export utility.  
- Timeline: MVP completion milestone.

## Reflection & Follow-up

### What Worked Well
- Persona immersion yielded concrete workflow requirements.  
- Question storming uncovered comprehensive validation and compliance gaps.  
- Scenario testing reinforced operational resilience priorities.  
- Assumption reversal sharpened the MVP’s core value proposition.

### Areas for Further Exploration
- Long-term device management strategy: Dedicated tablets vs. BYOD.  
- Data residency commitments: Clarify Supabase hosting regions for government comfort.  
- Training delivery formats: Determine best mix of in-person, video, and multilingual guides.

### Recommended Follow-up Techniques
- Mind Mapping: To visualise dependencies between MVP features and pilot KPIs.  
- Five Whys: To drill into root causes of low admin engagement if observed during pilot.  
- Morphological Analysis: To explore combinational solutions for security vs. usability trade-offs.

### Questions That Emerged
- How will we monitor sync health across multiple pilot sites centrally?  
- What governance is needed for shared devices (logouts, kiosk mode)?  
- Which local partners can co-sponsor pilots for legitimacy and support?  
- How do we budget for tablet hardware within pilot economics?

### Next Session Planning
- **Suggested topics:** Pilot partner selection, training content outline, technical spike priorities.  
- **Recommended timeframe:** Within 2 weeks to align with MVP backlog grooming.  
- **Preparation needed:** Early wireframes of receptionist flow, draft Supabase schema, pilot candidate shortlist.

---

*Session facilitated using the BMAD-METHOD™ brainstorming framework*
