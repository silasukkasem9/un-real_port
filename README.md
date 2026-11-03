# UNREAL PorT

**Design for users, not systems.**

UNREAL PorT is the portfolio of **Th!rD**—an IT student interested in system design, thoughtful interfaces, and the engineering decisions that make complex ideas usable. The mind may produce twelve possible architectures; the work is to find the one that deserves to ship.

## What this project is

This is a single-page personal portfolio built around an editorial, warm-neutral visual direction. It presents capabilities, an About profile, contact links, and a source-grounded ShabulabX engineering case study. The site includes responsive section navigation, hash-based section links, and a short introductory sequence with reduced-motion support.

The portfolio favors inspectable evidence over impressive-sounding claims. “Architecture of Madness” is a name for the ambitious, sometimes untidy thinking behind a project—not a substitute for clear boundaries or working code.

## Technology

Versions below are the ranges declared in `package.json`:

- React and React DOM `^19.3.1`
- TypeScript `~5.9.3`
- Vite `^8.3.4`
- Motion for React (`motion`) `^14.4.0`
- Lucide React `^1.59.0`
- CSS Modules for component-scoped styles
- ESLint `^10.13.0` with TypeScript and React Hooks plugins

Vite 8 requires Node.js `^20.19.0` or `>=22.12.0`. The committed npm lockfile uses lockfile version 3; use npm 9 or newer.

## Getting started

From the repository root:

```sh
npm ci
npm run dev
```

Vite prints the local development URL when the server is ready.

Available project scripts:

```sh
npm run lint
npm run build
npm run preview
```

`npm run build` runs the TypeScript project build and creates the production site in `dist/`. `npm run preview` serves that built output locally.

An additional TypeScript validation command is:

```sh
npx tsc --noEmit
```

This is a validation command, not a `package.json` script. There is currently no test script in the project configuration.

The portfolio does not require an API URL or environment variables. Do not add private values to `VITE_*` variables: Vite embeds those values into client-side assets.

## Project structure

```text
public/                 Static favicon and SVG assets
src/
  assets/               Image assets
  components/           Intro sequence, navigation, and shared UI
  data/                 Capability and case-study content
  sections/             Hero, capabilities, about, and contact
  App.tsx               Page composition
  main.tsx              React entry point
index.html              Document metadata and app mount point
vite.config.ts          Vite configuration
eslint.config.js        ESLint configuration
tsconfig*.json          TypeScript project configuration
```

## Featured engineering work: ShabulabX

The portfolio's ShabulabX case study is a source-grounded architectural analysis of the linked frontend and backend repositories:

- [SHABULAB.frontend](https://github.com/silasukkasem9/SHABULAB.frontend)
- [SHABULAB.backend](https://github.com/silasukkasem9/SHABULAB.backend)

The case study links to implementation files and separates observed source behavior from limitations. Product-service paths correspond to backend product routes. The frontend inventory adjustment and availability calls do not match the inventory routes found in the backend, so that integration is identified as partial. Machine records exist, but live hardware connectivity and deployment/runtime behavior were not verified. The repositories demonstrate that code exists; they do not, by themselves, establish individual authorship, production use, or operational outcomes.

## Identity and contact

- GitHub: [silasukkasem9](https://github.com/silasukkasem9)
- Email: [silasukaksem9@gmail.com](mailto:silasukaksem9@gmail.com)

## Deploying to Vercel

This is a standard Vite static build. Import the project’s Git repository into Vercel and use the Vite framework preset. The repository root is the project root; the expected install command is `npm ci`, the build command is `npm run build`, and the output directory is `dist`.

No backend service or environment variable is required by this portfolio. Its section navigation uses URL fragments such as `#about` and `#contact`, so no custom route rewrite is needed for those links. Use the Vercel-provided URL; no production URL is listed here because a deployment has not been confirmed.
