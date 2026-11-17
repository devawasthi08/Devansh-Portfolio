# Devansh Awasthi · Portfolio

A cinematic, scroll-driven portfolio: a photo that splits into human and AI halves, then a scooter ride through projects, skills and education, ending at a contact scene.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no API keys.

## Run it locally
Open `index.html` in a browser. Or serve the folder:

    npx serve .

## Structure
    index.html            page markup (hero, ride cards, finale, menus)
    css/style.css         all styles, colors are variables at the top (:root)
    js/main.js            scroll engine, scooter scene, cursor, Ctrl+K menu
    assets/img/           photo and project screenshots
    assets/Devansh_Awasthi_Resume.pdf   résumé used by the Résumé button

## Customise
- Text, projects and skills: edit the `<article class="card">` blocks in `index.html`.
- Colors: change the variables in `:root` in `css/style.css`.
- Stops on the ride: `stops` and `nm` arrays in `js/main.js` (one entry per card, in order).
- Screenshots: replace files in `assets/img/` and keep the same names.
- Contact links: search `index.html` for `mailto:`, `linkedin.com` and `github.com`.

## Deploy (GitHub Pages)
Put these files at the root of a repo named `<username>.github.io`, then Settings > Pages > Deploy from branch `main` / root.

## Notes
Screenshots are from client work and have sensitive details blurred. Do not add company source code to this repository.
