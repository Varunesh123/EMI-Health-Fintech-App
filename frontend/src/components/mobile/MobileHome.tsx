import {
    Activity,
    Bell,
    MessageSquare,
    TrendingUp,
  } from "lucide-react";
  import { C } from "../../constants/design.ts";
  import RiskBadge from "../common/RiskBadge";
  import MobileBottomBar from "./MobileBottomBar";
  
  function MobileHome() {
    return (
      <div className="flex flex-col h-full" style={{ background: C.slate50 }}>
        {/* Header */}
        <div className="px-5 pt-4 pb-4" style={{ background: `linear-gradient(160deg, ${C.navy900}, ${C.navy800})` }}>
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-xs" style={{ color: C.indigo300 }}>Good morning,</p>
              <p className="text-base font-bold" style={{ color: C.white }}>Priya Sharma 👋</p>
            </div>
            <div className="relative">
              <Bell size={20} color={C.indigo300} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.re500, color: C.white }}>2</span>
            </div>
          </div>
          {/* Risk card */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-medium" style={{ color: C.indigo300 }}>JUNE EMI RISK</p>
              <RiskBadge level="LOW" size="sm" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-extrabold" style={{ color: C.white }}>24<span className="text-lg ml-1 font-normal" style={{ color: C.indigo300 }}>/100</span></p>
                <p className="text-xs mt-1" style={{ color: C.em400 }}>✓ On track · EMI due in 12 days</p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: C.indigo300 }}>Next EMI</p>
                <p className="text-sm font-bold" style={{ color: C.white }}>₹34,200</p>
                <p className="text-xs" style={{ color: C.slate400 }}>Jun 25, 2025</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Quick actions */}
        <div className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.slate500 }}>Quick Actions</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Activity, label: 'Risk Check', color: C.navy600 },
              { icon: MessageSquare, label: 'Ask AI', color: C.navy600 },
              { icon: Bell, label: 'Reminders', color: C.navy600 },
              { icon: TrendingUp, label: 'CIBIL', color: C.navy600 },
            ].map((a, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy800}, ${C.navy700})`, boxShadow: '0 2px 8px rgba(4,13,31,0.15)' }}>
                  <a.icon size={20} color={C.indigo300} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight" style={{ color: C.slate600 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
  
        {/* Signal summary */}
        <div className="px-5 pb-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.slate500 }}>Signal Summary</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'EMI Burden', val: 28, status: '✓ Safe' },
              { label: 'Balance Cover', val: 82, status: '✓ 3× buffer' },
              { label: 'Income Buffer', val: 65, status: '✓ Good' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 flex items-center gap-3" style={{ background: C.white, border: `1px solid ${C.slate200}` }}>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: C.slate600 }}>{s.label}</span>
                    <span style={{ color: C.em500 }}>{s.status}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: C.slate200 }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${s.val}%`, background: C.em500 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MobileBottomBar active="home" />
      </div>
    )
  }
export default MobileHome;