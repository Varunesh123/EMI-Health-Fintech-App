import type { ElementType } from "react";
import { C } from "../../constants/design.ts";

function StatCard({
  label, value, subtext, progress, progressColor, icon: Icon
}: {
  label: string; value: string; subtext?: string; progress?: number; progressColor?: string; icon?: ElementType
}) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: C.white, border: `1px solid ${C.slate200}`, boxShadow: '0 1px 4px rgba(4,13,31,0.06)' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.slate500 }}>{label}</p>
          <p className="text-xl font-bold mt-1" style={{ color: C.slate800 }}>{value}</p>
          {subtext && <p className="text-xs mt-0.5" style={{ color: C.slate500 }}>{subtext}</p>}
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.slate100 }}>
            <Icon size={16} color={C.navy600} />
          </div>
        )}
      </div>
      {progress !== undefined && (
        <div>
          <div className="w-full rounded-full h-1.5" style={{ background: C.slate200 }}>
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: progressColor || C.navy600 }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: C.slate400 }}>{progress}%</p>
        </div>
      )}
    </div>
  )
}
export default StatCard;
// ─── Gauge ────────────────────────────────────────────────────────────────────
