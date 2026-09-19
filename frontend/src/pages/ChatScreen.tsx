import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronRight,
  Home,
  Lock,
  MessageSquare,
  Send,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { C } from "../constants/design";
import type { Screen } from "../types/navigation";

function ChatScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'ai' as const,
      text: "Hi Priya! 👋 I'm your EMI Health AI assistant. I can answer questions about your loan, risk score, policy details, or help you plan your repayments. What would you like to know?",
      source: null,
    },
    {
      role: 'user' as const,
      text: "Why is my EMI risk score showing as LOW?",
      source: null,
    },
    {
      role: 'ai' as const,
      text: "Your risk score is LOW (24/100) because all 5 signals are in a healthy range: your EMI is only 28% of your salary (below the 40% safe threshold), your account balance covers 3+ upcoming EMIs, you have 12 days until the due date, your disposable income buffer is ₹18,400, and you have a clean 36-month repayment history. Keep it up! 🎉",
      source: "HDFC Loan Policy v2.3 · Section 4.2 — Risk Thresholds",
    },
  ])
  const [showFallback, setShowFallback] = useState(false)

  const chips = [
    "Why is my EMI risk high?",
    "Can I get an extension?",
    "How to improve my CIBIL?",
    "What is EMI burden %?",
    "Prepayment charges?",
  ]

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const q = text.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q, source: null }])
    setTimeout(() => {
      if (q.toLowerCase().includes('extension') || q.toLowerCase().includes('waiver')) {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: "I couldn't find specific extension policy details for your loan in my current knowledge base. Here's what I can help with: ✅ Risk score explanation ✅ EMI calculation ✅ Prepayment options ✅ CIBIL improvement tips. For extension requests, I'd recommend calling HDFC at 1800-22-4060 directly.",
          source: null,
        }])
        setShowFallback(true)
      } else {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: `Great question about "${q}". Based on your loan profile and HDFC's current policies, your EMI obligations are well-structured. Your floating rate of 8.65% p.a. means your EMI may vary slightly if the repo rate changes. I recommend keeping a 2-EMI buffer in your linked account at all times.`,
          source: "HDFC Home Loan Policy v2.3 · Section 7.1",
        }])
      }
    }, 600)
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.slate50 }}>
      {/* Sidebar same as dashboard */}
      <aside className="w-60 flex-shrink-0 flex-col hidden md:flex" style={{ background: C.white, borderRight: `1px solid ${C.slate200}` }}>
        <div className="p-5 flex items-center gap-2.5 border-b" style={{ borderColor: C.slate200 }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
            <ShieldCheck size={15} color={C.white} />
          </div>
          <span className="font-bold text-base" style={{ color: C.navy900, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>EMI Health</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1 mt-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard', action: () => onNavigate('dashboard') },
            { id: 'risk', icon: Activity, label: 'Risk Check', action: () => onNavigate('dashboard') },
            { id: 'chat', icon: MessageSquare, label: 'Ask AI', active: true },
            { id: 'reminders', icon: Bell, label: 'Reminders' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={item.action}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
              style={{
                background: item.active ? `linear-gradient(135deg, ${C.navy700}, ${C.navy600})` : 'transparent',
                color: item.active ? C.white : C.slate600,
              }}
            >
              <item.icon size={16} />{item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ background: C.white, borderColor: C.slate200 }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
              <Zap size={15} color={C.white} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: C.navy900 }}>EMI Health AI</p>
              <p className="text-xs flex items-center gap-1" style={{ color: C.em500 }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Online · RAG-powered
              </p>
            </div>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-1 text-xs font-medium" style={{ color: C.slate500 }}>
            ← Dashboard
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
                  <Zap size={13} color={C.white} />
                </div>
              )}
              <div className={`max-w-[70%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                <div
                  className="relative px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: m.role === 'ai' ? C.white : `linear-gradient(135deg, ${C.navy600}, ${C.navy500})`,
                    color: m.role === 'ai' ? C.slate700 : C.white,
                    border: m.role === 'ai' ? `1px solid ${C.slate200}` : 'none',
                    boxShadow: '0 1px 4px rgba(4,13,31,0.06)',
                  }}
                >
                  {m.text}
                </div>
                {m.source && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: C.slate100, color: C.slate500, border: `1px solid ${C.slate200}` }}>
                    <Lock size={10} />
                    {m.source}
                  </div>
                )}
              </div>
            </div>
          ))}

          {showFallback && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: C.am100, border: `1px solid #fcd34d` }}>
                <AlertTriangle size={13} color={C.am500} />
              </div>
              <div className="max-w-[70%] rounded-2xl px-4 py-3 text-sm" style={{ background: C.am100, border: `1px solid #fcd34d` }}>
                <p className="font-semibold mb-1" style={{ color: '#92400e' }}>I couldn't find that in our policy docs</p>
                <p style={{ color: '#a16207' }}>Here's what I can help with:</p>
                <ul className="mt-2 flex flex-col gap-1" style={{ color: '#b45309' }}>
                  {['Explain your risk score', 'EMI calculation help', 'Prepayment options', 'CIBIL improvement'].map(t => (
                    <li key={t} className="flex items-center gap-1.5"><ChevronRight size={12} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Suggested chips */}
        <div className="px-6 pb-3">
          <div className="flex gap-2 flex-wrap">
            {chips.map(c => (
              <button
                key={c}
                onClick={() => sendMessage(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:border-navy-500"
                style={{ border: `1px solid ${C.slate300}`, color: C.slate600, background: C.white }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-6">
          <div className="flex gap-3 p-1 rounded-2xl" style={{ background: C.white, border: `1px solid ${C.slate300}`, boxShadow: '0 2px 8px rgba(4,13,31,0.06)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about your EMI, risk score, or loan policy…"
              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
              style={{ color: C.slate800 }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80 m-0.5"
              style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.navy500})` }}
            >
              <Send size={16} color={C.white} />
            </button>
          </div>
          <p className="text-center text-xs mt-2" style={{ color: C.slate400 }}>RAG-powered · Answers grounded in your loan's official policy docs</p>
        </div>
      </div>
    </div>
  )
}

// ─── MOBILE SCREENS ───────────────────────────────────────────────────────────
export default ChatScreen;