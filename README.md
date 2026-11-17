# Devansh Awasthi · Interactive Portfolio

A cinematic, scroll-driven portfolio built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**: a photo that splits into human and AI halves, followed by a dynamic SVG scooter ride through work, skills, and education, ending at a contact finale.

---

## 🚀 Getting Started

### Run Locally (Development)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production (Static Export)
```bash
npm run build
```
This generates an optimized static export ready for GitHub Pages in the `out/` directory.

---

## 📁 Project Structure

```
├── public/                                # Static assets served directly
│   ├── .nojekyll                          # GitHub Pages static bundle flag
│   └── assets/
│       ├── Devansh_Awasthi_Resume.pdf     # Résumé PDF for download
│       └── img/                           # Project screenshots & profile photos
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Fonts (next/font/google) & SEO Metadata
│   │   ├── page.tsx                       # App Router page
│   │   └── globals.css                    # 15-section modular design system
│   ├── components/
│   │   └── Portfolio.tsx                  # Interactive client-side portfolio engine
│   └── data/
│       └── portfolioData.ts               # Typed data (bio, links, stats, stops)
├── next.config.ts                         # Static export configuration
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Scripts and dependencies
└── .gitignore                             # Ignored build directories (.next, out, node_modules)
```

---

## 🛠️ How to Customize

- **Bio & Contact Details**: Edit `src/data/portfolioData.ts`.
- **Card Descriptions & Projects**: Edit the card items in `src/components/Portfolio.tsx`.
- **Colors & Themes**: Change CSS variables in `src/app/globals.css` under `:root`.
- **Images**: Replace files in `public/assets/img/` keeping the same filenames.
- **Résumé**: Replace `public/assets/Devansh_Awasthi_Resume.pdf` with your updated résumé.

---

## 🌐 Deploy to GitHub Pages

1. Push your code to GitHub on branch `main`.
2. In your repo: **Settings** > **Pages** > Set source to **Deploy from a branch** (`main` / root or via GitHub Actions).
