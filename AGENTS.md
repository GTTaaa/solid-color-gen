# Repository Guidelines

This is a Next.js 15 + TypeScript app using the App Router, Tailwind CSS, and `pnpm` for package management.

## Project Structure & Module Organization

- Application entry and routes live in `src/app` (e.g., `page.tsx`, `layout.tsx`, `globals.css`).
- Reusable UI lives in `src/components` (React function components, `PascalCase` filenames).
- Shared utilities and non-UI logic live in `src/lib`.
- Keep feature-specific logic close to its primary page or component.

## Build, Test, and Development Commands

- `pnpm dev` – Run the local dev server.
- `pnpm build` – Create a production build.
- `pnpm start` – Run the production server from the build output.
- `pnpm lint` – Run ESLint (Next.js config) to catch style and correctness issues.

## Coding Style & Naming Conventions

- Use TypeScript, React function components, and hooks; avoid class components.
- Prefer `PascalCase` for components (`SolidColorPicker.tsx`) and `camelCase` for helpers (`generateColorToken.ts`).
- Use Tailwind utility classes in `className`; keep global CSS changes in `src/app/globals.css`.
- Run `pnpm lint` before opening a PR; fix all reported issues.

## Testing Guidelines

- There is no formal test setup yet; when adding tests, colocate them near code (e.g., `src/components/Button.test.tsx`).
- Prefer React Testing Library for components and Playwright or Cypress for end-to-end tests.
- Add a `test` script to `package.json` and document new commands in `README.md`.

## Commit & Pull Request Guidelines

- Follow the existing history: short, descriptive, present-tense messages (English or Chinese are both acceptable).
- Group related changes into a single commit; avoid unrelated refactors in feature or bugfix commits.
- PRs should include: a clear summary, screenshots or GIFs for UI changes, and notes about any new commands, env vars, or breaking changes.

## Agent-Specific Instructions

- Keep changes minimal and focused on the requested task.
- Do not add new dependencies or tooling without clear justification.
- Preserve existing patterns in file structure, component organization, and Tailwind usage.

## Communication
Always answer questions in Chinese.