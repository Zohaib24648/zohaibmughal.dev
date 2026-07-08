# zohaibmughal.dev

Personal portfolio of **Zohaib Ali Mughal** — full-stack product engineering across five production platforms (Hyss, Conek, Sportefy, ETG, Plexor).

**Live: [zohaibmughal.dev](https://zohaibmughal.dev)** · served via GitHub Pages on a custom domain.

## Structure

- `index.html` — home page (hero, proof strip, selected work, skills, about, contact)
- `work/<project>/` — one case-study page per project
- `assets/` — CSS, JS (vendored Lenis), images, deck PDFs, CV
- `CNAME` — custom domain for GitHub Pages

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Push to `main`; GitHub Pages serves from the root of the branch and deploys in about a minute.
