// String-form plugin reference: the PostCSS worker resolves it at runtime.
// Importing/requiring the plugin here would make Turbopack bundle lightningcss's
// native .node binding, which fails the build. Tests never load this file —
// vitest.config.ts overrides css.postcss with an empty plugin list.
export default { plugins: ["@tailwindcss/postcss"] };
