# Graph Report - .  (2026-07-11)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 203 nodes · 435 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2cb4f332`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.tsx
- site.ts
- Nav.tsx
- Products.tsx
- devDependencies
- compilerOptions
- page.tsx
- manifest.json
- vercel.json
- .eslintrc.json
- next.config.mjs
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `formatNeck()` - 15 edges
3. `waLink()` - 15 edges
4. `PHONES` - 12 edges
5. `useCart()` - 11 edges
6. `primaryNeckMm()` - 11 edges
7. `Reveal()` - 9 edges
8. `Product` - 8 edges
9. `productBadge()` - 7 edges
10. `AddedToCartToast()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `ProductPage()` --calls--> `productBadge()`  [EXTRACTED]
  app/products/[slug]/page.tsx → lib/products.ts
- `NeckButton()` --calls--> `formatNeck()`  [EXTRACTED]
  components/Products.tsx → lib/products.ts
- `formatNeckLocal()` --calls--> `formatNeck()`  [EXTRACTED]
  app/products/[slug]/page.tsx → lib/products.ts
- `generateMetadata()` --calls--> `weightRange()`  [EXTRACTED]
  app/products/[slug]/page.tsx → lib/products.ts
- `AddedToCartToast()` --calls--> `waLink()`  [EXTRACTED]
  components/AddedToCartToast.tsx → lib/site.ts

## Import Cycles
- None detected.

## Communities (12 total, 4 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.11
Nodes (25): Capabilities(), ICONS, CountUp(), FAQ(), FAQS, FinalCTA(), Hero(), DAWN_EASE (+17 more)

### Community 1 - "site.ts"
Cohesion: 0.12
Nodes (18): Contact(), CallButton(), Variant, variants, WhatsAppButton(), FloatingCTA(), ArrowRight(), ClockIcon() (+10 more)

### Community 2 - "Nav.tsx"
Cohesion: 0.17
Nodes (24): AddedToCartToast(), CartDrawer(), CartItemRow(), P, PhoneIcon(), Plus(), ShoppingBagIcon(), WhatsAppIcon() (+16 more)

### Community 3 - "Products.tsx"
Cohesion: 0.11
Nodes (21): dmSans, jetbrains, metadata, plusJakarta, structuredData, viewport, NeckButton(), ProductFamilyButton() (+13 more)

### Community 4 - "devDependencies"
Cohesion: 0.08
Nodes (23): dependencies, motion, next, react, react-dom, description, devDependencies, eslint (+15 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "page.tsx"
Cohesion: 0.18
Nodes (10): formatNeckLocal(), generateMetadata(), ProductPage(), Props, TINT, Breadcrumb(), BreadcrumbItem, BreadcrumbProps (+2 more)

### Community 7 - "manifest.json"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

## Knowledge Gaps
- **76 isolated node(s):** `extends`, `plusJakarta`, `dmSans`, `jetbrains`, `viewport` (+71 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `motion` connect `devDependencies` to `page.tsx`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **What connects `extends`, `plusJakarta`, `dmSans` to the rest of the system?**
  _76 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10634920634920635 - nodes in this community are weakly interconnected._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11693548387096774 - nodes in this community are weakly interconnected._
- **Should `Products.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._