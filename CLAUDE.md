# Working in this repo

This repo is **only the published site**. It is public, and pushing to `main` deploys it to
zohaibmughal.dev via GitHub Pages in about a minute.

## Where the content comes from

The sources live in a **private sibling repo**, `~/Desktop/Projects/Portfolio`:

| What | Source of truth |
|---|---|
| Every factual claim / number | `Portfolio/02-portfolio/case-studies/*.md` |
| Deck PDFs in `assets/decks/` | exported from `Portfolio/02-portfolio/decks/source/*.dc.html` |
| Images in `assets/img/` | copied from `Portfolio/02-portfolio/assets/library/` |
| `assets/cv/` | built from `Portfolio/01-identity/cv/`, the **public** (phone-redacted) build |

Edit the source in the hub, then copy the built output here. Changing a number in this repo
alone means the site and the CV will disagree in front of a client.

`assets/img/` holds only the subset of the library that pages actually reference — copy images
in as you use them rather than mirroring the whole library.

## Public repo

Everything here is world-readable and indexed. Only the phone-redacted CV goes in `assets/cv/`.
No client data, no credentials, no unreleased screenshots.

## Known drift

The Sportefy page's metric block (`work/sportefy/index.html`) still shows the June 2026
figures — 42 modules, 100+ endpoints, 414 Flutter tests. A September recount gives 47, 181 and
823. See the **Open drift** section of `Portfolio/02-portfolio/case-studies/_INDEX.md` before
updating: the deck sources and PDFs carry the same stale numbers and need the same pass.

## Don't break Pages

`CNAME` (custom domain) and `.nojekyll` (serve `_`-prefixed paths as-is) must stay at the repo
root. Deleting either takes the site down or mangles asset paths.
