"use client";
// In production (Next.js) this re-exports the real Link.
// In test/codegrade (plain Vite), vitest.config.ts aliases this entire
// file to src/__mocks__/next-link.tsx, so the line below never executes.
export { default } from "next/link";
