import { useState } from "react";
import { LogOut } from "lucide-react";
import { C } from "../../constants/design.ts";
import RiskBadge from "../common/RiskBadge";
import MobileBottomBar from "./MobileBottomBar";

function MobileSettings() {
  const [notifs, setNotifs] = useState(true)
  const [biometric, setBiometric] = useState(true)
  return (
    <div className="flex flex-col h-full" style={{ background: C.slate50 }}>
      {/* Profile header */}
      <div className="px-5 py-5" style={{ background: `linear-gradient(160deg, ${C.navy900}, ${C.navy800})` }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold" style={{ background: 'rgba(100,128,228,0.2)', color: C.white }}>PS</div>
          <div>
            <p className="text-base font-bold" style={{ color: C.white }}>Priya Sharma</p>
            <p className="text-xs" style={{ color: C.indigo300 }}>priya.sharma@gmail.com</p>
            <RiskBadge level="LOW" size="sm" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Loan info */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.slate200}`, background: C.white }}>
          <div className="px-4 py-2 border-b" style={{ background: C.slate50, borderColor: C.slate200 }}>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.slate500 }}>Linked Loan</p>
          </div>
          {[
            { label: 'Bank', value: 'HDFC Bank' },
            { label: 'Loan Type', value: 'Home Loan' },
            { label: 'Loan ID', value: '#HL-2841-PRS' },
            { label: 'EMI Amount', value: '₹34,200 / month' },
          ].map((r, i) => (
            <div key={i} className="px-4 py-3 flex justify-between border-b last:border-0" style={{ borderColor: C.slate100 }}>
              <span className="text-xs" style={{ color: C.slate500 }}>{r.label}</span>
              <span className="text-xs font-semibold" style={{ color: C.navy900 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.slate200}`, background: C.white }}>
          <div className="px-4 py-2 border-b" style={{ background: C.slate50, borderColor: C.slate200 }}>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.slate500 }}>Preferences</p>
          </div>
          {[
            { label: 'EMI Reminders', sub: 'Get alerts before due date', state: notifs, toggle: () => setNotifs(!notifs) },
            { label: 'Biometric Login', sub: 'Face ID / Fingerprint', state: biometric, toggle: () => setBiometric(!biometric) },
          ].map((s, i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between border-b last:border-0" style={{ borderColor: C.slate100 }}>
              <div>
                <p className="text-xs font-semibold" style={{ color: C.navy900 }}>{s.label}</p>
                <p className="text-[10px]" style={{ color: C.slate400 }}>{s.sub}</p>
              </div>
              <button
                onClick={s.toggle}
                className="w-10 h-6 rounded-full transition-colors relative"
                style={{ background: s.state ? C.navy600 : C.slate300 }}
              >
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all" style={{ left: s.state ? 22 : 4 }} />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2" style={{ border: `1px solid ${C.re500}`, color: C.re500, background: C.re100 }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
      <MobileBottomBar active="settings" />
    </div>
  )
}
export default MobileSettings;