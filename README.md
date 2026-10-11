# HWcontrol Team

Official organization and product-discovery website for HWcontrol Team. This repository contains the public-facing Astro site; the desktop application itself lives in the [HWcontrol2.0 repository](https://github.com/lordkeremello45/HWcontrol2.0).

## Live destinations

- Team website: https://lordkeremello45.github.io/HWcontrol-Team.github.io/
- Product overview: https://lordkeremello45.github.io/HWcontrol-Team.github.io/product/
- Getting started: https://lordkeremello45.github.io/HWcontrol-Team.github.io/getting-started/
- Testing and contributions: https://lordkeremello45.github.io/HWcontrol-Team.github.io/contribute/
- Privacy: https://lordkeremello45.github.io/HWcontrol-Team.github.io/privacy/
- Security: https://lordkeremello45.github.io/HWcontrol-Team.github.io/security/
- HWcontrol2.0 website: https://lordkeremello45.github.io/HWcontrol2.0/
- Source and releases: https://github.com/lordkeremello45/HWcontrol2.0/releases

## Purpose

The website helps users understand what the product does, choose a supported release, install it cautiously, report reproducible problems and contribute without requiring social-media accounts.

## Principles

- Security-first engineering and explicit hardware capability reporting.
- Local-first application behavior and no intentional unnecessary telemetry.
- Accurate beta status, package availability and signing claims.
- Accessible, responsive pages with useful technical documentation.
- Organic discovery through search-friendly content, open documentation and real contributions; no bought engagement or fabricated endorsements.

## Development

Requirements: Node.js 24 and npm.

From the repository root:

- Install dependencies: `npm install`
- Build static pages: `npm run build`
- Check expected routes, metadata, internal links, robots.txt and sitemap.xml: `npm run check:site`
- Preview the built site: `npm run preview`

The GitHub Pages workflow runs the build and site checks before deployment. The build result and live deployment still need to be verified in GitHub Actions after changes.

## Discovery plan

See [docs/ORGANIC-DISCOVERY.md](docs/ORGANIC-DISCOVERY.md) for the social-media-free plan, catalog-submission readiness and privacy-conscious measurement. Search Console configuration, external catalog acceptance and independent adoption are not claimed as complete.

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
