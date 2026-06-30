// Centralized design tokens for a calm, premium dark aesthetic.
// Muted surfaces, soft contrast, and a single restrained accent — nothing shiny.
export const theme = {
  colors: {
    background: '#0E0F12',
    surface: '#16181D',
    surfaceBorder: '#23262E',
    textPrimary: '#F2F3F5',
    textSecondary: '#9BA0AA',
    textMuted: '#5C6069',
    accent: '#C9A86A',
    accentSoft: 'rgba(201, 168, 106, 0.14)',
  },
  spacing: (n: number) => n * 8,
  radius: {
    md: 16,
    lg: 24,
    pill: 999,
  },
} as const;

export type Theme = typeof theme;
export default theme;
