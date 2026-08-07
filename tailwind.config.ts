import type { Config } from 'tailwindcss';
export default { darkMode: 'class', content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme: { extend: { boxShadow: { glow:'0 20px 70px rgba(16,185,129,.18)' } } }, plugins: [] } satisfies Config;
