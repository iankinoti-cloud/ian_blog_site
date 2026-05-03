import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const plugins = {};
try {
  require('@tailwindcss/postcss');
  plugins['@tailwindcss/postcss'] = {};
} catch {
  // @tailwindcss/postcss not available in this environment (e.g. CI/test)
}

export default { plugins };
