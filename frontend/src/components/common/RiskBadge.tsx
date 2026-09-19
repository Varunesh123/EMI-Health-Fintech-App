import { Circle } from "lucide-react";
import { RISK_COLORS, type RiskLevel } from "../../constants/design.ts";

function RiskBadge({ level, size = 'md' }: { level: RiskLevel; size?: 'sm' | 'md' | 'lg' }) {
  const r = RISK_COLORS[level]
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm', lg: 'px-4 py-1.5 text-base' }
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizes[size]}`}
      style={{ background: r.badge, color: r.badgeText }}
    >
      <Circle size={size === 'lg' ? 8 : 6} fill="currentColor" stroke="none" />
      {level} RISK
    </span>
  )
}
export default RiskBadge;