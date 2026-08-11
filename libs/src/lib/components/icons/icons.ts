// ────────────────────────────────────────────────────────────
// SysDiag icon registry — data module, not a component.
// Icon.svelte renders by name; consumers can enumerate via
// ICON_NAMES. Hand-drawn line art, Phosphor-style: uniform
// stroke, round caps, small filled dots for status LEDs.
// ────────────────────────────────────────────────────────────

export type IconName =
  // system metaphors
  | 'data-lake'
  | 'data-warehouse'
  | 'data-lakehouse'
  | 'object-storage'
  | 'ecommerce'
  | 'database'
  | 'server'
  | 'queue'
  | 'api'
  | 'browser'
  // data formats
  | 'log'
  | 'parquet'
  | 'json'
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  // tools & engines
  | 'catalog'
  | 'governance'
  | 'shield'
  | 'etl'
  | 'gear'
  | 'spark'
  | 'snowflake'
  | 'bolt'
  | 'compass'
  | 'console'
  // status & people
  | 'check'
  | 'cross'
  | 'warn'
  | 'info'
  | 'question'
  | 'lock'
  | 'clock'
  | 'refresh'
  | 'user'
  | 'thumbsup';

export const ICON_NAMES: IconName[] = [
  'data-lake',
  'data-warehouse',
  'data-lakehouse',
  'object-storage',
  'ecommerce',
  'database',
  'server',
  'queue',
  'api',
  'browser',
  'log',
  'parquet',
  'json',
  'text',
  'image',
  'video',
  'audio',
  'catalog',
  'governance',
  'shield',
  'etl',
  'gear',
  'spark',
  'snowflake',
  'bolt',
  'compass',
  'console',
  'check',
  'cross',
  'warn',
  'info',
  'question',
  'lock',
  'clock',
  'refresh',
  'user',
  'thumbsup',
];

// Inner SVG markup per icon. Rendered via {@html} in Icon.svelte —
// the map is a static constant, never user input. The root <svg>
// supplies fill/stroke defaults; inner elements may override
// (filled dots).
export const ICONS: Record<IconName, string> = {
  // ── system metaphors ─────────────────────────────────────
  'data-lake': `
      <ellipse cx="12" cy="6.2" rx="6.2" ry="2.3"/>
      <path d="M5.8 6.2v4.2c0 1.3 2.8 2.3 6.2 2.3s6.2-1 6.2-2.3V6.2"/>
      <path d="M3 15.6q2.25-2.3 4.5 0t4.5 0 4.5 0 4.5 0"/>
      <path d="M3 19.2q2.25-2.3 4.5 0t4.5 0 4.5 0 4.5 0"/>`,
  'data-warehouse': `
      <path d="M4.5 9.6 12 4.8l7.5 4.8"/>
      <path d="M6 9.4V19h12V9.4"/>
      <path d="M9.5 12.5v4.5M14.5 12.5v4.5M9.5 12.5h5M9.5 15h5M9.5 17h5"/>`,
  'data-lakehouse': `
      <path d="M5 11.6 9 8.2l4 3.4"/>
      <path d="M6.2 11.2v5.2h5.6v-5.2"/>
      <circle cx="17.8" cy="15.8" r="2.2"/>
      <path d="M17.8 12.2v1.3M17.8 18.1v1.3M14.2 15.8h1.3M20.1 15.8h1.3"/>
      <path d="M3 18.4q2.25-2.3 4.5 0t4.5 0 4.5 0 4.5 0"/>
      <path d="M3 21.6q2.25-2.3 4.5 0t4.5 0 4.5 0 4.5 0"/>`,
  'object-storage': `
      <path d="M3.5 7a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z"/>
      <rect x="9.3" y="10" width="5.4" height="5.4" rx="0.8"/>
      <path d="M9.3 12.2h5.4M12 10v5.4"/>`,
  ecommerce: `
      <path d="M4 8.5h16"/>
      <path d="M5.5 8.5v9.8a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V8.5"/>
      <path d="M9.6 12.6h5.2l-.9 3.4H10.5z"/>
      <circle cx="10.4" cy="17.1" r="1"/>
      <circle cx="14" cy="17.1" r="1"/>
      <path d="M9.6 12.6l-.7-2.4H7.6"/>`,
  database: `
      <ellipse cx="12" cy="5.2" rx="7" ry="2.5"/>
      <path d="M5 5.2v13.6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.2"/>
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>`,
  server: `
      <rect x="4.5" y="4.3" width="15" height="6" rx="1.6"/>
      <rect x="4.5" y="13.7" width="15" height="6" rx="1.6"/>
      <circle cx="8.2" cy="7.3" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="11.5" cy="7.3" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="8.2" cy="16.7" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="11.5" cy="16.7" r="0.8" fill="currentColor" stroke="none"/>`,
  queue: `
      <path d="M4 6.5h11M4 12h16M4 17.5h8"/>`,
  api: `
      <path d="M9.6 8.4 5.6 12l4 3.6M14.4 8.4l4 3.6-4 3.6"/>`,
  browser: `
      <rect x="3" y="4.5" width="18" height="15" rx="2"/>
      <path d="M3 9h18"/>
      <circle cx="6.2" cy="6.9" r="0.7" fill="currentColor" stroke="none"/>
      <circle cx="9" cy="6.9" r="0.7" fill="currentColor" stroke="none"/>
      <circle cx="11.8" cy="6.9" r="0.7" fill="currentColor" stroke="none"/>`,

  // ── data formats ─────────────────────────────────────────
  log: `
      <path d="M6 3.8h9l3 3v13.2a.7.7 0 0 1-.7.7H6.7a.7.7 0 0 1-.7-.7z"/>
      <path d="M15 3.8v3h3"/>
      <path d="M9 11h6.5M9 14h6.5M9 17h4.5"/>`,
  parquet: `
      <path d="M6 3.8h9l3 3v13.2a.7.7 0 0 1-.7.7H6.7a.7.7 0 0 1-.7-.7z"/>
      <path d="M15 3.8v3h3"/>
      <rect x="8.5" y="9.8" width="7" height="5" rx="0.5"/>
      <path d="M10.8 9.8v5M13.2 9.8v5M8.5 12.3h7"/>`,
  json: `
      <path d="M6 3.8h9l3 3v13.2a.7.7 0 0 1-.7.7H6.7a.7.7 0 0 1-.7-.7z"/>
      <path d="M15 3.8v3h3"/>
      <path d="M10.3 10.3l-2.1 2.1 2.1 2.1M13.7 10.3l2.1 2.1-2.1 2.1"/>`,
  text: `
      <path d="M6 3.8h9l3 3v13.2a.7.7 0 0 1-.7.7H6.7a.7.7 0 0 1-.7-.7z"/>
      <path d="M15 3.8v3h3"/>
      <path d="M9 11h6.5M9 14h4"/>`,
  image: `
      <rect x="3.5" y="4.8" width="17" height="14.4" rx="2"/>
      <circle cx="8.8" cy="9.6" r="1.5"/>
      <path d="M3.5 16.6 9.5 12l3.2 2.9 4-3.4 3.8 3.1"/>`,
  video: `
      <rect x="3.5" y="6" width="13" height="12" rx="2.5"/>
      <path d="M9 9.3l5.4 2.7L9 14.7z"/>`,
  audio: `
      <path d="M4.2 10v4h3.3L12 17.2V6.8L7.5 10z"/>
      <path d="M15.6 9.4a4.6 4.6 0 0 1 0 5.2M17.9 7.4a7.6 7.6 0 0 1 0 9.2"/>`,

  // ── tools & engines ──────────────────────────────────────
  catalog: `
      <path d="M12 6.6C10 5.2 6.6 5 4 5.7v12.4c2.6-.7 6-.5 8 .9 2-1.4 5.4-1.6 8-.9V5.7c-2.6-.7-6-.5-8 .9z"/>
      <path d="M12 6.6v12.4"/>`,
  governance: `
      <path d="M12 3.5l7 2.6v5.1c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V6.1z"/>
      <path d="M9.2 11.6l2 2 3.6-3.7"/>`,
  shield: `
      <path d="M12 3.5l7 2.6v5.1c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V6.1z"/>`,
  etl: `
      <circle cx="9.8" cy="14.6" r="3.4"/>
      <path d="M9.8 9.2v1.5M9.8 18.5v1.5M5.4 14.6h1.5M12.7 14.6h1.5"/>
      <circle cx="9.8" cy="14.6" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="16.3" cy="6.8" r="2.3"/>
      <path d="M16.3 2.7v1.1M16.3 9.8v1.1M12.2 6.8h1.1M19.3 6.8h1.1"/>
      <circle cx="16.3" cy="6.8" r="0.8" fill="currentColor" stroke="none"/>`,
  gear: `
      <circle cx="12" cy="12" r="3.1"/>
      <path d="M12 4.6v1.8M12 17.6v1.8M4.6 12h1.8M17.6 12h1.8M6.9 6.9l1.3 1.3M15.8 15.8l1.3 1.3M17.1 6.9l-1.3 1.3M8.2 15.8l-1.3 1.3"/>`,
  spark: `
      <path d="M12 3.6c.7 4.1 2 5.4 6.1 6.1-4.1.7-5.4 2-6.1 6.1-.7-4.1-2-5.4-6.1-6.1 4.1-.7 5.4-2 6.1-6.1z"/>
      <path d="M18.8 15.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"/>`,
  snowflake: `
      <path d="M12 3.6v16.8M4.6 7.8l14.8 8.4M19.4 7.8l-14.8 8.4"/>
      <path d="M12 3.6 10.2 5M12 3.6l1.8 1.4M12 20.4l-1.8-1.4M12 20.4l1.8-1.4M4.6 7.8l1 2.3M4.6 7.8l2.3-1M19.4 7.8l-1 2.3M19.4 7.8l-2.3-1M4.6 16.2l2.3 1M4.6 16.2l1-2.3M19.4 16.2l-1-2.3M19.4 16.2l-2.3 1"/>`,
  bolt: `
      <path d="M13.2 3.6 5.8 13.6h4.9l-.9 6.8 7.4-10h-4.9z"/>`,
  compass: `
      <circle cx="12" cy="12" r="8.5"/>
      <path d="M15.9 8.1 14 14l-5.9 1.9L10 10z"/>`,
  console: `
      <path d="M6 4v16M12 4v16M18 4v16"/>
      <path d="M4 7.5h4M10 14h4M16 6h4"/>`,

  // ── status & people ──────────────────────────────────────
  check: `
      <path d="M5 12.6l4.4 4.4L19 7.4"/>`,
  cross: `
      <path d="M6.6 6.6l10.8 10.8M17.4 6.6L6.6 17.4"/>`,
  warn: `
      <path d="M12 4.6 21 19.4H3z"/>
      <path d="M12 10.4v3.8"/>
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none"/>`,
  info: `
      <circle cx="12" cy="12" r="8"/>
      <path d="M12 11.2v4.4"/>
      <circle cx="12" cy="7.9" r="0.7" fill="currentColor" stroke="none"/>`,
  lock: `
      <rect x="5.6" y="10.6" width="12.8" height="8.8" rx="1.8"/>
      <path d="M8.6 10.6V8.4a3.4 3.4 0 0 1 6.8 0v2.2"/>
      <circle cx="12" cy="14.8" r="1.1"/>`,
  clock: `
      <circle cx="12" cy="12" r="8"/>
      <path d="M12 7.4V12l3.1 2.1"/>`,
  refresh: `
      <path d="M4.8 12a7.2 7.2 0 0 1 12.4-5.2"/>
      <path d="M16.8 3.4v4.1h-4.1"/>
      <path d="M19.2 12a7.2 7.2 0 0 1-12.4 5.2"/>
      <path d="M7.2 20.6v-4.1h4.1"/>`,
  user: `
      <circle cx="12" cy="8.2" r="3.4"/>
      <path d="M5.2 19.4c.7-3 3.6-5 6.8-5s6.1 2 6.8 5"/>`,
  question: `
      <circle cx="12" cy="12" r="8.5"/>
      <path d="M9.3 9.4a2.9 2.9 0 1 1 3.9 2.8c-.9.3-1.4 1-1.4 1.9"/>
      <circle cx="12" cy="16.7" r="0.6" fill="currentColor" stroke="none"/>`,
  thumbsup: `
      <path d="M7 10v12"/>
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>`,
};
