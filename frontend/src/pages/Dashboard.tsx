import { useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { C } from "../constants/design.ts";
import PrimaryButton from "../components/common/PrimaryButton.tsx";
import RiskBadge from "../components/common/RiskBadge.tsx";
import RiskGauge from "../components/common/RiskGauge.tsx";
import SecondaryButton from "../components/common/SecondaryButton.tsx";
import StatCard from "../components/common/StatCard.tsx";
import type {Screen} from "../types/navigation.ts";

function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeNav, setActiveNav] = useState('dashboard')

  const signals = [
    { label: 'EMI Burden % of Salary', value: '28%', subtext: 'Well within 40% safe zone', progress: 28, color: C.em500, icon: Wallet },
    { label: 'Balance vs EMI Amount', value: '3.2×', subtext: 'Balance covers 3 EMIs ahead', progress: 82, color: C.em500, icon: CreditCard },
    { label: 'Days-left Urgency', value: '12 days', subtext: 'Next EMI: June 25, 2025', progress: 55, color: C.am500, icon: Clock },
    { label: 'Disposable Income Buffer', value: '₹18,400', subtext: '41% of net salary remaining', progress: 65, color: C.em500, icon: TrendingUp },
    { label: 'Past Default Behaviour', value: 'Clean', subtext: '0 defaults in 36 months', progress: 95, color: C.em500, icon: UserCheck },
  ]

  const alerts = [
    { time: '2h ago', text: 'Salary credited — ₹44,800 received', type: 'good' },
    { time: '1d ago', text: 'EMI due in 13 days — balance sufficient', type: 'good' },
    { time: '3d ago', text: 'Risk score updated: 24 → 22 (improved)', type: 'good' },
    { time: '5d ago', text: 'New policy: prepayment charges reduced to 2%', type: 'info' },
  ]

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'risk', icon: Activity, label: 'Risk Check' },
    { id: 'chat', icon: MessageSquare, label: 'Ask AI', action: () => onNavigate('chat') },
    { id: 'reminders', icon: Bell, label: 'Reminders' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.slate50 }}>
      {/* SIDEBAR */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{ background: C.white, borderRight: `1px solid ${C.slate200}` }}>
        <div className="p-5 flex items-center gap-2.5 border-b" style={{ borderColor: C.slate200 }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
            <ShieldCheck size={15} color={C.white} />
          </div>
          <span className="font-bold text-base" style={{ color: C.navy900, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>EMI Health</span>
        </div>

        <div className="p-4 border-b" style={{ borderColor: C.slate200 }}>
          <div className="rounded-xl p-3" style={{ background: C.slate50 }}>
            <p className="text-xs font-medium" style={{ color: C.slate500 }}>Logged in as</p>
            <p className="text-sm font-semibold mt-0.5" style={{ color: C.navy900 }}>Priya Sharma</p>
            <p className="text-xs" style={{ color: C.slate400 }}>HDFC Home Loan · ₹34,200/mo</p>
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={item.action || (() => setActiveNav(item.id))}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full`}
              style={{
                background: activeNav === item.id ? `linear-gradient(135deg, ${C.navy700}, ${C.navy600})` : 'transparent',
                color: activeNav === item.id ? C.white : C.slate600,
              }}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: C.slate200 }}>
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors hover:bg-slate-50"
            style={{ color: C.slate500 }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b" style={{ background: 'rgba(248,250,252,0.95)', backdropFilter: 'blur(8px)', borderColor: C.slate200 }}>
          <div>
            <h1 className="text-lg font-bold" style={{ color: C.navy900 }}>Risk Dashboard</h1>
            <p className="text-xs" style={{ color: C.slate500 }}>Last updated: Today, 9:42 AM · HDFC Home Loan #HL-2841</p>
          </div>
          <div className="flex items-center gap-3">
            <RiskBadge level="LOW" size="sm" />
            <PrimaryButton small onClick={() => onNavigate('chat')}>Ask AI <MessageSquare size={14} /></PrimaryButton>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main gauge card */}
          <div className="xl:col-span-2 rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.slate200}`, boxShadow: '0 2px 12px rgba(4,13,31,0.06)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-base font-bold" style={{ color: C.navy900 }}>Current Risk Score</h2>
                <p className="text-sm mt-0.5" style={{ color: C.slate500 }}>Based on 5 AI-analyzed signals</p>
              </div>
              <RiskBadge level="LOW" size="md" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <RiskGauge level="LOW" score={24} />
              <div className="flex-1">
                <div className="rounded-xl p-4 mb-4" style={{ background: C.em100, border: `1px solid #6ee7b7` }}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle size={18} color={C.em500} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#065f46' }}>You're on track this month</p>
                      <p className="text-xs mt-0.5" style={{ color: '#047857' }}>AI recommendation: No action required. Your EMI is due June 25 and your balance comfortably covers it.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <PrimaryButton small onClick={() => onNavigate('chat')}>Talk to AI Advisor</PrimaryButton>
                  <SecondaryButton className="text-sm px-4 py-2">Set Reminder</SecondaryButton>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.slate200}`, boxShadow: '0 2px 12px rgba(4,13,31,0.06)' }}>
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy900 }}>Recent Alerts</h2>
            <div className="flex flex-col gap-3">
              {alerts.map((a, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: C.slate50, border: `1px solid ${C.slate200}` }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.type === 'good' ? C.em500 : C.navy500 }} />
                  <div>
                    <p className="text-xs leading-relaxed" style={{ color: C.slate700 }}>{a.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: C.slate400 }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 signal cards */}
          <div className="xl:col-span-2">
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy900 }}>Signal Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {signals.map((s, i) => (
                <StatCard key={i} label={s.label} value={s.value} subtext={s.subtext} progress={s.progress} progressColor={s.color} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-2xl p-6" style={{ background: `linear-gradient(160deg, ${C.navy900}, ${C.navy700})` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(100,128,228,0.2)' }}>
                <Zap size={15} color={C.indigo300} />
              </div>
              <span className="text-sm font-semibold" style={{ color: C.indigo300 }}>AI Recommendation</span>
            </div>
            <h3 className="text-base font-bold mb-2" style={{ color: C.white }}>Great financial health this month!</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.indigo300 }}>
              Your EMI burden is well below the 40% threshold. Consider setting up an auto-debit to further protect your CIBIL score and avoid any late payment risk.
            </p>
            <PrimaryButton small onClick={() => onNavigate('chat')} className="w-full justify-center">
              Ask AI for More Tips
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── CHAT SCREEN ──────────────────────────────────────────────────────────────
export default Dashboard;