# Graph Report - c:\Users\piyus\Downloads\Nawkiran\Nawkiran Website  (2026-07-11)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 372 nodes · 574 edges · 34 communities (29 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2adacfe8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- products.ts
- aptus.ts
- icons.tsx
- devDependencies
- page.tsx
- compilerOptions
- AGENTS.md — Planning-First Multi-Agent Execution Protocol
- page.tsx
- motion.tsx
- verify-aptus.mjs
- 13. Mandatory Batch Loop
- Preform.tsx
- Product
- manifest.json
- layout.tsx
- 4. Required Roles
- 0. Task Triage and Protocol Selection
- 12. Phase 5 — Execution Orchestration
- 5. Mandatory Context and Efficiency Stack
- 6. Skill Discovery and Use
- 10. Phase 3 — Create the Executor-Ready Plan
- 11. Phase 4 — Adversarial Plan Review
- 16. Full-Project Final Review
- 9. Phase 2 — Grill Me Requirement Discovery
- 18. Token and Context Optimization
- 8. Phase 1 — Repository Reconnaissance
- vercel.json
- .eslintrc.json
- aptus.test.ts
- next.config.mjs
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `AGENTS.md — Planning-First Multi-Agent Execution Protocol` - 27 edges
2. `compilerOptions` - 16 edges
3. `formatNeck()` - 15 edges
4. `13. Mandatory Batch Loop` - 12 edges
5. `primaryNeckMm()` - 11 edges
6. `APTUS_SITE_PATH` - 9 edges
7. `aptusWaLink()` - 9 edges
8. `Product` - 8 edges
9. `WhatsAppIcon()` - 8 edges
10. `waLink()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `WhatsAppButton()` --calls--> `waLink()`  [EXTRACTED]
  components/CTA.tsx → lib/site.ts
- `SpecTable()` --calls--> `formatNeck()`  [EXTRACTED]
  components/SpecTable.tsx → lib/products.ts
- `ProductPage()` --calls--> `productBadge()`  [EXTRACTED]
  app/products/[slug]/page.tsx → lib/products.ts
- `NeckButton()` --calls--> `formatNeck()`  [EXTRACTED]
  components/Products.tsx → lib/products.ts
- `Contact()` --references--> `PHONES`  [EXTRACTED]
  components/Contact.tsx → lib/site.ts

## Import Cycles
- None detected.

## Communities (34 total, 5 thin omitted)

### Community 0 - "products.ts"
Cohesion: 0.09
Nodes (31): metadata, generateMetadata(), ProductPage(), Props, AddedToCartToast(), CartDrawer(), CartItemRow(), Footer() (+23 more)

### Community 1 - "aptus.ts"
Cohesion: 0.08
Nodes (35): metadata, metadata, structuredData, AptusCartContext, AptusCartContextValue, AptusCartDrawer(), AptusCartItem, AptusCartProvider() (+27 more)

### Community 2 - "icons.tsx"
Cohesion: 0.10
Nodes (26): Contact(), Variant, variants, WhatsAppButton(), FloatingCTA(), ArrowRight(), AwardIcon(), ClockIcon() (+18 more)

### Community 3 - "devDependencies"
Cohesion: 0.08
Nodes (24): dependencies, motion, next, react, react-dom, description, devDependencies, eslint (+16 more)

### Community 4 - "page.tsx"
Cohesion: 0.11
Nodes (14): Capabilities(), ICONS, FAQ(), FAQS, FinalCTA(), TRUST_POINTS, Hero(), STARS (+6 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "AGENTS.md — Planning-First Multi-Agent Execution Protocol"
Cohesion: 0.12
Nodes (15): 14. Testing Strategy, 15. Visual and Browser Validation, 17. Definition of Done, 19. Change Control and Safety, 1. Purpose, 20. Required Working Artifacts, 21. Standard Plan Template, 22. Standard Batch Record (+7 more)

### Community 7 - "page.tsx"
Cohesion: 0.21
Nodes (11): AptusFamilyPage(), AptusVariant, describeVariant(), FAMILY_DESCRIPTIONS, generateMetadata(), getDescription(), Props, Breadcrumb() (+3 more)

### Community 8 - "motion.tsx"
Cohesion: 0.20
Nodes (7): DAWN_EASE, Reveal(), Stagger(), StaggerItem(), Step, STEPS, ARCS

### Community 9 - "verify-aptus.mjs"
Cohesion: 0.22
Nodes (11): chrome, consoleErrors, evaluate(), navigate(), networkErrors, pending, profile, screenshot() (+3 more)

### Community 10 - "13. Mandatory Batch Loop"
Cohesion: 0.17
Nodes (12): 13.1 Trivial Fast Loop, 13.2 Standard and Substantial Batch Loop, 13. Mandatory Batch Loop, Step 1 — Define, Step 2 — Establish Baseline, Step 3 — Execute According to Capability Mode, Step 4 — Sub-Agent Self-Check, Step 5 — Integrate (+4 more)

### Community 11 - "Preform.tsx"
Cohesion: 0.24
Nodes (8): BOTTLE, clamp(), Geo, Preform(), Shape, Tint, TINTS, tunedGeo()

### Community 12 - "Product"
Cohesion: 0.22
Nodes (8): Accessibility & Inclusion, Anti-references, Brand Personality, Design Principles, Product, Product Purpose, Register, Users

### Community 13 - "manifest.json"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

### Community 14 - "layout.tsx"
Cohesion: 0.29
Nodes (5): dmSans, jetbrains, metadata, plusJakarta, viewport

### Community 15 - "4. Required Roles"
Cohesion: 0.33
Nodes (6): 4.1 Planner, 4.2 Executor / Orchestrator, 4.3 Specialized Sub-Agents, 4.4 Reviewer, 4.5 Delegation and Concurrency Capability Gate, 4. Required Roles

### Community 16 - "0. Task Triage and Protocol Selection"
Cohesion: 0.40
Nodes (5): 0.1 Trivial Fast Path, 0.2 Standard Task, 0.3 Substantial or High-Risk Task, 0.4 Triage Output, 0. Task Triage and Protocol Selection

### Community 17 - "12. Phase 5 — Execution Orchestration"
Cohesion: 0.40
Nodes (5): 12.1 No One-Shot Execution, 12.2 Delegation and Parallelism, 12.3 Sub-Agent Work Order, 12.4 Model Routing, 12. Phase 5 — Execution Orchestration

### Community 18 - "5. Mandatory Context and Efficiency Stack"
Cohesion: 0.40
Nodes (5): 5.1 Ponytail — Always Active, 5.2 LeanCTX — Always Active, 5.3 Graphify — Always Active, 5.4 Mandatory Tool Bootstrap, 5. Mandatory Context and Efficiency Stack

### Community 19 - "6. Skill Discovery and Use"
Cohesion: 0.40
Nodes (5): 6.1 Required Discovery, 6.2 Selection Standard, 6.3 Skill Manifest, 6.4 Mandatory Planning Skill, 6. Skill Discovery and Use

### Community 20 - "10. Phase 3 — Create the Executor-Ready Plan"
Cohesion: 0.50
Nodes (4): 10.1 Required Plan Sections, 10.2 Task Quality Standard, 10.3 Plan Granularity, 10. Phase 3 — Create the Executor-Ready Plan

### Community 21 - "11. Phase 4 — Adversarial Plan Review"
Cohesion: 0.50
Nodes (4): 11.1 Required Review Lenses, 11.2 Failure Pre-Mortem, 11.3 Plan Readiness Gate, 11. Phase 4 — Adversarial Plan Review

### Community 22 - "16. Full-Project Final Review"
Cohesion: 0.50
Nodes (4): 16.1 Requirements Traceability, 16.2 Required Final Checks, 16.3 Independent Final Review, 16. Full-Project Final Review

### Community 23 - "9. Phase 2 — Grill Me Requirement Discovery"
Cohesion: 0.50
Nodes (4): 9.1 Interview Rules, 9.2 Required Topics, 9.3 Exit Criteria, 9. Phase 2 — Grill Me Requirement Discovery

### Community 24 - "18. Token and Context Optimization"
Cohesion: 0.67
Nodes (3): 18.1 Context Rules, 18.2 Hard Cost and Token Budget Gate, 18. Token and Context Optimization

### Community 25 - "8. Phase 1 — Repository Reconnaissance"
Cohesion: 0.67
Nodes (3): 8.1 Required Reconnaissance, 8.2 Reconnaissance Output, 8. Phase 1 — Repository Reconnaissance

## Knowledge Gaps
- **180 isolated node(s):** `extends`, `Variant`, `variants`, `Shape`, `Tint` (+175 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `motion` connect `devDependencies` to `motion.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `AGENTS.md — Planning-First Multi-Agent Execution Protocol` connect `AGENTS.md — Planning-First Multi-Agent Execution Protocol` to `13. Mandatory Batch Loop`, `4. Required Roles`, `0. Task Triage and Protocol Selection`, `12. Phase 5 — Execution Orchestration`, `5. Mandatory Context and Efficiency Stack`, `6. Skill Discovery and Use`, `10. Phase 3 — Create the Executor-Ready Plan`, `11. Phase 4 — Adversarial Plan Review`, `16. Full-Project Final Review`, `9. Phase 2 — Grill Me Requirement Discovery`, `18. Token and Context Optimization`, `8. Phase 1 — Repository Reconnaissance`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `extends`, `Variant`, `variants` to the rest of the system?**
  _180 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `products.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09490196078431372 - nodes in this community are weakly interconnected._
- **Should `aptus.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08019323671497584 - nodes in this community are weakly interconnected._
- **Should `icons.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1036036036036036 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._