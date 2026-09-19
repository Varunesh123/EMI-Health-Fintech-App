import {
    Activity,
    CreditCard,
    Clock,
    TrendingUp,
    UserCheck,
    Wallet,
  } from "lucide-react";
  import { C } from "../../constants/design.ts";
  import RiskBadge from "../common/RiskBadge";
  import RiskGauge from "../common/RiskGauge";
  import MobileBottomBar from "./MobileBottomBar";
  
  function MobileRiskDetail() {
    const signals = [
      { label: 'EMI Burden % of Salary', value: '28%', subtext: 'Safe zone: below 40%', progress: 28, color: C.em500, icon: Wallet },
      { label: 'Balance vs EMI Amount', value: '3.2×', subtext: 'Covers 3+ months ahead', progress: 82, color: C.em500, icon: CreditCard },
      { label: 'Days-left Urgency', value: '12 days', subtext: 'Due: June 25, 2025', progress: 55, color: C.am500, icon: Clock },
      { label: 'Disposable Income Buffer', value: '₹18,400', subtext: '41% of net salary', progress: 65, color: C.em500, icon: TrendingUp },
      { label: 'Past Default Behaviour', value: 'Clean', subtext: '0 defaults · 36 months', progress: 95, color: C.em500, icon: UserCheck },
    ]
    return (
      <div className="flex flex-col h-full" style={{ background: C.slate50 }}>
        <div className="px-5 pt-4 pb-5" style={{ background: `linear-gradient(160deg, ${C.navy900}, ${C.navy800})` }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} color={C.indigo300} />
            <span className="text-sm font-semibold" style={{ color: C.white }}>Risk Check Detail</span>
          </div>
          <div className="flex flex-col items-center">
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', marginBottom: -20 }}>
              <RiskGauge level="LOW" score={24} />
            </div>
            <RiskBadge level="LOW" size="lg" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.slate500 }}>5 Signal Breakdown</p>
          <div className="flex flex-col gap-3">
            {signals.map((s, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: C.white, border: `1px solid ${C.slate200}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.slate100 }}>
                    <s.icon size={16} color={C.navy600} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium" style={{ color: C.slate600 }}>{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: C.navy900 }}>{s.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full mb-1" style={{ background: C.slate200 }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${s.progress}%`, background: s.color }} />
                    </div>
                    <p className="text-xs" style={{ color: C.slate400 }}>{s.subtext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MobileBottomBar active="risk" />
      </div>
    )
  }
export default MobileRiskDetail;