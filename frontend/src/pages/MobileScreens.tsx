import { useState } from "react";

import { C } from "../constants/design";
import MobileFrame from "../components/mobile/MobileFrame";
import MobileOnboarding from "../components/mobile/MobileOnboarding";
import MobileHome from "../components/mobile/MobileHome";
import MobileRiskDetail from "../components/mobile/MobileRiskDetail";
import MobileChat from "../components/mobile/MobileChat";
import MobileNotifications from "../components/mobile/MobileNotifications";
import MobileSettings from "../components/mobile/MobileSettings";

import type { Screen } from "../types/navigation.ts";
import LandingPage from "./LandingPage.tsx";
import Dashboard from "./Dashboard.tsx";
import ChatScreen from "./ChatScreen.tsx";

function MobileScreens() {
  return (
    <div className="py-16 px-8" style={{ background: C.slate100 }}>
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: C.navy600 }}>Mobile App</p>
        <h2 className="text-4xl font-bold" style={{ color: C.navy900 }}>iPhone App Screens</h2>
        <p className="mt-2 text-sm" style={{ color: C.slate500 }}>375 × 812 · iOS 17 · 6 screens</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        <MobileFrame title="1 — Onboarding / Login">
          <MobileOnboarding />
        </MobileFrame>
        <MobileFrame title="2 — Home Screen">
          <MobileHome />
        </MobileFrame>
        <MobileFrame title="3 — Risk Check Detail">
          <MobileRiskDetail />
        </MobileFrame>
        <MobileFrame title="4 — Ask AI Chat">
          <MobileChat />
        </MobileFrame>
        <MobileFrame title="5 — Notifications">
          <MobileNotifications />
        </MobileFrame>
        <MobileFrame title="6 — Settings / Profile">
          <MobileSettings />
        </MobileFrame>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')

  const nav = (s: Screen) => {
    setScreen(s)
    window.scrollTo(0, 0)
  }

  // Screen switcher tabs
  const tabs: { id: Screen; label: string }[] = [
    { id: 'landing', label: '① Landing Page' },
    { id: 'dashboard', label: '② Dashboard' },
    { id: 'chat', label: '③ Ask AI Chat' },
    { id: 'mobile', label: '④ Mobile Screens' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Screen switcher */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 px-2 py-1.5 rounded-2xl" style={{ background: C.navy950, boxShadow: '0 8px 32px rgba(4,13,31,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => nav(t.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: screen === t.id ? `linear-gradient(135deg, ${C.navy600}, ${C.navy500})` : 'transparent',
              color: screen === t.id ? C.white : C.slate400,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {screen === 'landing'    && <LandingPage onNavigate={nav} />}
      {screen === 'dashboard'  && <Dashboard onNavigate={nav} />}
      {screen === 'chat'       && <ChatScreen onNavigate={nav} />}
      {screen === 'mobile'     && <MobileScreens />}
    </div>
  )
}