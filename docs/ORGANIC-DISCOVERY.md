# Organic discovery plan (without social media)

This plan is for bringing real testers and contributors to HWcontrol2.0 without opening a Team Reddit account, running social-media profiles or buying engagement.

## 1. Make the product discoverable

- Keep the repository description, README opening, release labels and website title consistent with the actual product.
- Publish a sitemap containing only real, deployed pages and reference it from robots.txt.
- Give each useful page a distinct title and meta description.
- Use stable canonical URLs and working links from the Team site to the product, source, releases and support.
- Prefer substantive guides answering real user questions over thin pages created only to target keywords.
- Review broken links and route changes as part of the website build.

## 2. Make first use understandable

- Link directly to the current release list and explain the supported operating systems and architectures.
- Explain beta status, hardware limitations, integrity verification and how to report a missing asset.
- Keep installation instructions separate by platform.
- Never claim that an artifact is available, signed or supported unless the release itself provides evidence.

## 3. Earn technical trust

- Answer real programming and systems questions on Stack Exchange only when the answer is independently useful. Do not post product advertisements or repetitive self-promotion.
- Publish reproducible engineering notes: IPC security boundaries, capability detection, safe hardware-control behavior, localization testing and cross-platform packaging.
- Link to relevant source code and test evidence. Correct mistakes promptly.
- Invite independent testers through the repository's issues, contribution guide and release notes.

## 4. Prepare software catalog submissions

A catalog listing is a separate submission, not an automatic result of publishing a GitHub release. Before applying to any package manager or software directory, verify its current rules and make sure the package can meet them.

Readiness checklist:
- Stable and versioned release assets with permanent URLs.
- Verified package hashes and documented installation/uninstallation behavior.
- Accurate license, publisher, architecture, OS requirements and screenshots.
- No false claims about Authenticode, Apple Developer ID or notarization.
- A reliable update and security-response process.
- Maintainer capacity to fix broken manifests and remove outdated packages.

Potential future targets include Windows Package Manager (winget), Chocolatey, and Linux distribution/catalog ecosystems. Do not submit packages that fail the target's current acceptance or signing requirements. Mark each target as not submitted until a real submission and acceptance can be verified.

## 5. Measure outcomes without adding behavioral tracking

Use public, aggregate signals where available:
- GitHub release downloads and issue/PR activity.
- GitHub repository traffic reports, which have a limited retention window.
- Search Console impressions, clicks and indexing coverage, if the owner elects to configure it.
- Reproducible external bug reports, hardware compatibility reports and contributions.

Do not add third-party behavioral trackers merely to count visitors. Never treat raw visits or stars as proof that the software is reliable.

## Monthly review

1. Verify all site links, release links, sitemap entries and supported-platform statements.
2. Review incoming bug reports and resolve duplicate or unclear reports.
3. Improve one or two documentation gaps supported by actual user questions.
4. Review search queries and aggregate traffic, if configured.
5. Record which external catalog submissions were attempted, accepted, rejected or deferred, with evidence.

## Current state

The Team website has product, getting-started, contribution, privacy, security and technical-guide routes. The sitemap and a build-time site smoke check are maintained in the repository. Search-engine indexing, Search Console ownership, external catalog acceptance and independent community adoption are not claimed as complete by this document.
