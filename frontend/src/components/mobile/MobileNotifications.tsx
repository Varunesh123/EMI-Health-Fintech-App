import {
    AlertTriangle,
    Bell,
    CheckCircle,
    ShieldCheck,
    TrendingUp,
  } from "lucide-react";
  import { C } from "../../constants/design.ts";
  import MobileBottomBar from "./MobileBottomBar";
  
  function MobileNotifications() {
    const alerts = [
      { icon: CheckCircle, color: C.em500, bg: C.em100, title: 'Salary Credited', body: '₹44,800 received in your HDFC account', time: '2h ago', tag: 'Automated' },
      { icon: Bell, color: C.navy600, bg: '#e0e7ff', title: 'EMI Due in 12 Days', body: 'Jun 25 EMI of ₹34,200 — balance sufficient', time: '1d ago', tag: 'Reminder' },
      { icon: TrendingUp, color: C.em500, bg: C.em100, title: 'Risk Score Improved', body: 'Score updated: 26 → 24 (improved by 2 points)', time: '3d ago', tag: 'AI Update' },
      { icon: AlertTriangle, color: C.am500, bg: C.am100, title: 'Policy Update', body: 'HDFC reduced prepayment charges from 3% to 2%', time: '5d ago', tag: 'Policy' },
      { icon: ShieldCheck, color: C.navy600, bg: '#e0e7ff', title: 'Account Connected', body: 'HDFC loan account successfully linked via AA', time: '7d ago', tag: 'Security' },
    ]
    return (
      <div className="flex flex-col h-full" style={{ background: C.slate50 }}>
        <div className="px-5 py-4 border-b" style={{ background: C.white, borderColor: C.slate200 }}>
          <p className="text-base font-bold" style={{ color: C.navy900 }}>Notifications</p>
          <p className="text-xs" style={{ color: C.slate500 }}>5 alerts this month</p>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {alerts.map((a, i) => (
            <div key={i} className="rounded-2xl p-4 flex gap-3" style={{ background: C.white, border: `1px solid ${C.slate200}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: a.bg }}>
                <a.icon size={16} color={a.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-semibold" style={{ color: C.navy900 }}>{a.title}</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0" style={{ background: C.slate100, color: C.slate500 }}>{a.tag}</span>
                </div>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: C.slate500 }}>{a.body}</p>
                <p className="text-[10px] mt-1.5" style={{ color: C.slate400 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
        <MobileBottomBar active="alerts" />
      </div>
    )
  }
  export default MobileNotifications;