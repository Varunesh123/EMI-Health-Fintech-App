
// constants.ts

// ─── Color System ────────────────────────────────────────────────────────────

export const C = {
  // ─────────────────────────────────────────────
  // BRAND / NAVY
  // ─────────────────────────────────────────────
  navy950: "#040d1f",
  navy900: "#071630",
  navy800: "#0c2352",
  navy700: "#103070",
  navy600: "#1a4494",
  navy500: "#2558b0",

  // ─────────────────────────────────────────────
  // INDIGO
  // ─────────────────────────────────────────────
  indigo600: "#4f46e5",
  indigo400: "#647fe4",
  indigo300: "#9eaff0",
  indigo200: "#c5cff7",
  indigo100: "#e0e6fb",

  // ─────────────────────────────────────────────
  // EMERALD / LOW RISK
  // ─────────────────────────────────────────────
  em500: "#10b981",
  em400: "#34d399",
  em300: "#6ee7b7",
  em200: "#a7f3d0",
  em100: "#d1fae5",

  // ─────────────────────────────────────────────
  // AMBER / MEDIUM RISK
  // ─────────────────────────────────────────────
  am500: "#f59e0b",
  am400: "#fbbf24",
  am300: "#fcd34d",
  am200: "#fde68a",
  am100: "#fef3c7",

  // ─────────────────────────────────────────────
  // RED / HIGH RISK
  // ─────────────────────────────────────────────
  re50: "#FEF2F2",
  re500: "#ef4444",
  re400: "#f87171",
  re300: "#fca5a5",
  re200: "#fecaca",
  re100: "#fee2e2",
  re700: "#B91C1C",

  // ─────────────────────────────────────────────
  // SLATE / NEUTRALS
  // ─────────────────────────────────────────────
  slate950: "#020617",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  slate50: "#f8fafc",

  // ─────────────────────────────────────────────
  // BASIC
  // ─────────────────────────────────────────────
  white: "#ffffff",
  black: "#000000",

  // ─────────────────────────────────────────────
  // TRANSPARENT / OVERLAY
  // ─────────────────────────────────────────────
  overlayWhite05: "rgba(255, 255, 255, 0.05)",
  overlayWhite06: "rgba(255, 255, 255, 0.06)",
  overlayWhite10: "rgba(255, 255, 255, 0.10)",
  overlayWhite12: "rgba(255, 255, 255, 0.12)",

  overlayIndigo15: "rgba(100, 128, 228, 0.15)",
  overlayIndigo25: "rgba(100, 128, 228, 0.25)",
  overlayIndigo30: "rgba(100, 128, 228, 0.30)",

  overlayEmerald10: "rgba(16, 185, 129, 0.10)",
  overlayEmerald20: "rgba(16, 185, 129, 0.20)",

  // ─────────────────────────────────────────────
  // GRADIENTS
  // ─────────────────────────────────────────────
  gradientBrand:
    "linear-gradient(135deg, #103070, #647fe4)",

  gradientBrandDark:
    "linear-gradient(135deg, #071630, #0c2352)",

  gradientHero:
    "linear-gradient(160deg, #040d1f 0%, #0c2352 55%, #1a3a70 100%)",

  gradientCTA:
    "linear-gradient(160deg, #071630, #103070)",

  // ─────────────────────────────────────────────
  // BORDERS
  // ─────────────────────────────────────────────
  borderLight: "#e2e8f0",
  borderDark: "rgba(255, 255, 255, 0.06)",
  borderWhite10: "rgba(255, 255, 255, 0.10)",
  borderWhite12: "rgba(255, 255, 255, 0.12)",
  borderIndigo25: "rgba(100, 128, 228, 0.25)",
  borderEmerald20: "rgba(16, 185, 129, 0.20)",

  // ─────────────────────────────────────────────
  // SHADOWS
  // ─────────────────────────────────────────────
  shadowCard:
    "0 1px 4px rgba(4, 13, 31, 0.06)",

  shadowCardHover:
    "0 10px 25px rgba(4, 13, 31, 0.10)",

  // ─────────────────────────────────────────────
  // TYPOGRAPHY
  // ─────────────────────────────────────────────
  fontPrimary: "'Plus Jakarta Sans', sans-serif",
  fontBody: "'Inter', sans-serif",

  // ─────────────────────────────────────────────
  // PRIMARY / SEMANTIC
  // ─────────────────────────────────────────────
  primary100: "#d1fae5",
  primary300: "#6ee7b7",
  primary700: "#065f46",
} as const;


// ─── Risk System ─────────────────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export const RISK_COLORS: Record<
  RiskLevel,
  {
    bg: string;
    text: string;
    border: string;
    badge: string;
    badgeText: string;
  }
> = {
  LOW: {
    bg: C.em100,
    text: "#065f46",
    border: "#6ee7b7",
    badge: "#dcfce7",
    badgeText: "#15803d",
  },

  MEDIUM: {
    bg: C.am100,
    text: "#92400e",
    border: "#fcd34d",
    badge: C.am100,
    badgeText: "#b45309",
  },

  HIGH: {
    bg: C.re100,
    text: "#991b1b",
    border: "#fca5a5",
    badge: C.re100,
    badgeText: "#dc2626",
  },
};


// ─── Typography ──────────────────────────────────────────────────────────────

export const FONT = {
  family: {
    sans: "Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },

  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;


// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACE = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
  "5xl": "48px",
} as const;


// ─── Border Radius ───────────────────────────────────────────────────────────

export const RADIUS = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;


// ─── Shadows ─────────────────────────────────────────────────────────────────

export const SHADOW = {
  sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
  md: "0 4px 12px rgba(15, 23, 42, 0.08)",
  lg: "0 10px 30px rgba(15, 23, 42, 0.10)",
} as const;


// ─── Component Sizes ─────────────────────────────────────────────────────────

export const COMPONENT = {
  button: {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  },

  input: {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  },

  avatar: {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  },
} as const;


// ─── Risk Badge ──────────────────────────────────────────────────────────────

export const RISK_BADGE_SIZES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
} as const;


// ─── Shared Components ───────────────────────────────────────────────────────

export function getRiskColors(level: RiskLevel) {
  return RISK_COLORS[level];
}


// ─── Status System ────────────────────────────────────────────────────────────

export type Status =
  | "ACTIVE"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "INACTIVE";

export const STATUS_COLORS: Record<
  Status,
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  ACTIVE: {
    bg: C.em100,
    text: "#065f46",
    border: C.em400,
  },

  PENDING: {
    bg: C.am100,
    text: "#92400e",
    border: "#fcd34d",
  },

  APPROVED: {
    bg: C.em100,
    text: "#065f46",
    border: C.em400,
  },

  REJECTED: {
    bg: C.re100,
    text: "#991b1b",
    border: "#fca5a5",
  },

  COMPLETED: {
    bg: C.primary100,
    text: C.primary700,
    border: C.primary300,
  },

  INACTIVE: {
    bg: C.slate100,
    text: C.slate600,
    border: C.slate300,
  },
};


// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Applications",
    path: "/applications",
  },
  {
    label: "Customers",
    path: "/customers",
  },
  {
    label: "Analytics",
    path: "/analytics",
  },
  {
    label: "Reports",
    path: "/reports",
  },
] as const;


// ─── Risk Labels ─────────────────────────────────────────────────────────────

export const RISK_LABELS: Record<RiskLevel, string> = {
  LOW: "Low Risk",
  MEDIUM: "Medium Risk",
  HIGH: "High Risk",
};


// ─── Application Constants ───────────────────────────────────────────────────

export const APP = {
  name: "EMI Health",
  description:
    "Financial risk and EMI health monitoring platform",
  version: "1.0.0",
} as const;


// ─── Pagination ──────────────────────────────────────────────────────────────

export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
} as const;
