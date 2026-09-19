import { C, type RiskLevel } from "../../constants/design.ts";

function RiskGauge({ level, score }: { level: RiskLevel; score: number }) {
  const gaugeColor = level === 'LOW' ? C.em500 : level === 'MEDIUM' ? C.am500 : C.re500
  return (
    <div className="relative flex flex-col items-center">
      <div style={{ width: 240, height: 140, position: 'relative' }}>
        {/* Background arc */}
        <svg width="240" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
          <path d="M 20 130 A 100 100 0 0 1 220 130" fill="none" stroke={C.slate200} strokeWidth="16" strokeLinecap="round" />
          {/* Colored arc — LOW ≈ 0–33%, MEDIUM ≈ 33–66%, HIGH ≈ 66–100% */}
          {(() => {
            const pct = score / 100
            const startAngle = Math.PI
            const endAngle = Math.PI + pct * Math.PI
            const cx = 120, cy = 130, r = 100
            const x1 = cx + r * Math.cos(startAngle)
            const y1 = cy + r * Math.sin(startAngle)
            const x2 = cx + r * Math.cos(endAngle)
            const y2 = cy + r * Math.sin(endAngle)
            const large = pct > 0.5 ? 1 : 0
            return (
              <path
                d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
                fill="none"
                stroke={gaugeColor}
                strokeWidth="16"
                strokeLinecap="round"
              />
            )
          })()}
          {/* Needle dot */}
          {(() => {
            const pct = score / 100
            const angle = Math.PI + pct * Math.PI
            const cx = 120, cy = 130, r = 100
            const nx = cx + r * Math.cos(angle)
            const ny = cy + r * Math.sin(angle)
            return <circle cx={nx} cy={ny} r="8" fill={C.white} stroke={gaugeColor} strokeWidth="3" />
          })()}
        </svg>
        {/* Center label */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} className="text-center">
          <span className="text-3xl font-bold" style={{ color: C.slate800 }}>{score}</span>
          <span className="text-sm ml-1" style={{ color: C.slate500 }}>/100</span>
        </div>
      </div>
      {/* Zone labels */}
      <div className="flex justify-between w-full mt-1 px-4">
        <span className="text-xs font-medium" style={{ color: C.em500 }}>LOW</span>
        <span className="text-xs font-medium" style={{ color: C.am500 }}>MEDIUM</span>
        <span className="text-xs font-medium" style={{ color: C.re500 }}>HIGH</span>
      </div>
    </div>
  )
}
export default RiskGauge;


// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
