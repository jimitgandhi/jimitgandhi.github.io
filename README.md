# jimitgandhi.github.io

Personal website of Jimit Gandhi, live at [jimitgandhi.github.io](https://jimitgandhi.github.io).

## Stack

Next.js (static export), React, TypeScript, Tailwind CSS, shadcn/ui and Motion. Hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Update content

All text, links, experience, projects and publications live in `src/content/site.ts`.

Images:

1. Add the original file to `assets/source/` (project covers use the `project-<name>` prefix, 16:9).
2. Run `npm run images` to generate optimized WebP files in `public/images/`.
3. Reference `/images/<name>.webp` in `src/content/site.ts`.

The social preview image is `src/app/opengraph-image.png` (1200x630). Replace it and `twitter-image.png` together.

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server                     |
| `npm run build`     | Build the static site into `out/`        |
| `npm run preview`   | Serve `out/` at http://localhost:4173    |
| `npm run lint`      | Lint with ESLint                         |
| `npm run typecheck` | Type-check with TypeScript               |
| `npm run format`    | Format with Prettier                     |
| `npm run images`    | Optimize images from `assets/source/`    |

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.
