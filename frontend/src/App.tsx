import { useState } from 'react'
import {
  ShieldCheck, Zap, Bell, MessageSquare, ChevronRight, Star,
  TrendingUp, Lock, AlertTriangle, CheckCircle, ArrowRight,
  BarChart2, Clock, Wallet, Activity, UserCheck, Home,
  Settings, LogOut, Send, Menu,
  Building2, CreditCard, Circle
} from 'lucide-react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  navy950: '#040d1f',
  navy900: '#071630',
  navy800: '#0c2352',
  navy700: '#103070',
  navy600: '#1a4494',
  navy500: '#2558c0',
  indigo400: '#6480e4',
  indigo300: '#8fa2f0',
  em500: '#10b981',
  em400: '#34d399',
  em100: '#d1fae5',
  am500: '#f59e0b',
  am100: '#fef3c7',
  re500: '#ef4444',
  re100: '#fee2e2',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  white: '#ffffff',
}

type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

const RISK_COLORS: Record<RiskLevel, { bg: string; text: string; border: string; badge: string; badgeText: string }> = {
  LOW:    { bg: C.em100,  text: '#065f46', border: '#6ee7b7', badge: '#dcfce7', badgeText: '#15803d' },
  MEDIUM: { bg: C.am100,  text: '#92400e', border: '#fcd34d', badge: C.am100,   badgeText: '#b45309' },
  HIGH:   { bg: C.re100,  text: '#991b1b', border: '#fca5a5', badge: C.re100,   badgeText: '#dc2626' },
}

// ─── Shared components ────────────────────────────────────────────────────────

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

function PrimaryButton({ children, onClick, className = '', small = false }: {
  children: React.ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'} ${className}`}
      style={{ background: `linear-gradient(135deg, ${C.navy600} 0%, ${C.navy500} 100%)`, color: C.white }}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick, className = '' }: {
  children: React.ReactNode; onClick?: () => void; className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl border px-6 py-3 text-base transition-all duration-200 hover:bg-slate-50 active:scale-[0.98] ${className}`}
      style={{ borderColor: C.navy600, color: C.navy600 }}
    >
      {children}
    </button>
  )
}

function StatCard({
  label, value, subtext, progress, progressColor, icon: Icon
}: {
  label: string; value: string; subtext?: string; progress?: number; progressColor?: string; icon?: React.ElementType
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

// ─── Gauge ────────────────────────────────────────────────────────────────────

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

// ─── Screen selector ──────────────────────────────────────────────────────────

type Screen = 'landing' | 'dashboard' | 'chat' | 'mobile'

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────

function LandingPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const steps = [
    { icon: Building2, label: 'Connect loan details', desc: 'Link your bank & loan accounts securely via AA framework' },
    { icon: BarChart2, label: 'AI analyzes 5 risk signals', desc: 'EMI burden, balance, urgency, income buffer & history' },
    { icon: Bell, label: 'Get early alerts', desc: 'Proactive nudges 7–14 days before a potential default' },
    { icon: CheckCircle, label: 'Stay on track', desc: 'Follow AI-guided steps to protect your credit score' },
  ]

  const features = [
    { icon: Activity, title: 'AI Risk Scoring', desc: 'Proprietary 5-signal model trained on millions of loan repayment patterns. Updated daily.' },
    { icon: Bell, title: 'Smart Reminders', desc: 'Context-aware EMI reminders that adapt to your salary credit date and spending patterns.' },
    { icon: MessageSquare, title: 'Ask-AI Loan Assistant', desc: 'RAG-powered chat that answers your specific loan questions using your bank\'s policy docs.' },
    { icon: Lock, title: 'Bank-grade Security', desc: 'AES-256 encryption, full PII masking, RBI-compliant AA framework, and audit logs.' },
    { icon: TrendingUp, title: 'Credit Health Monitor', desc: 'Track how timely EMI payments improve your CIBIL score over time.' },
    { icon: Zap, title: 'Instant Risk Check', desc: 'Get your risk assessment in under 30 seconds. No paperwork, no branch visit.' },
  ]

  const stats = [
    { value: '2.4L+', label: 'Defaults Prevented' },
    { value: '8.9L+', label: 'Users Protected' },
    { value: '₹340Cr+', label: 'EMIs Secured' },
    { value: '99.2%', label: 'Accuracy Rate' },
  ]

  return (
    <div style={{ background: C.white, minHeight: '100vh' }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: C.slate200 }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
              <ShieldCheck size={16} color={C.white} />
            </div>
            <span className="font-bold text-lg" style={{ color: C.navy900, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>EMI Health</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Product', 'How it works', 'Security', 'Login'].map(l => (
              <a key={l} href="#" className="text-sm font-medium transition-colors hover:text-navy-600" style={{ color: C.slate600 }}>{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <PrimaryButton small onClick={() => onNavigate('dashboard')}>Check My Risk Free</PrimaryButton>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={20} color={C.slate700} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: C.slate200 }}>
            {['Product', 'How it works', 'Security', 'Login'].map(l => (
              <a key={l} href="#" className="text-sm font-medium" style={{ color: C.slate700 }}>{l}</a>
            ))}
            <PrimaryButton small>Check My Risk Free</PrimaryButton>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${C.navy950} 0%, ${C.navy800} 55%, #1a3a70 100%)` }} className="relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: C.indigo400 }} />
          <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-5" style={{ background: C.em500 }} />
          <div className="absolute bottom-0 right-1/4 w-px h-full opacity-10" style={{ background: `linear-gradient(${C.indigo300}, transparent)` }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium" style={{ background: 'rgba(100,128,228,0.15)', color: C.indigo300, border: `1px solid rgba(100,128,228,0.25)` }}>
              <Zap size={12} /> AI-Powered EMI Risk Prevention
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Never miss an EMI.<br />
              <span style={{ color: C.em400 }}>Know your risk</span><br />
              before it's too late.
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: C.indigo300 }}>
              EMI Health's AI scans 5 financial signals to detect default risk weeks in advance — so you can act, not react.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton onClick={() => onNavigate('dashboard')} className="text-base px-8 py-4">
                Check My Risk Free <ArrowRight size={18} />
              </PrimaryButton>
              <button className="flex items-center gap-2 text-sm font-medium" style={{ color: C.indigo300 }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: 'rgba(100,128,228,0.3)' }}>▶</div>
                See how it works
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[{ v: '8.9L+', l: 'users' }, { v: '2.4L+', l: 'defaults stopped' }, { v: '4.8★', l: 'rating' }].map(s => (
                <div key={s.l}>
                  <div className="text-xl font-bold" style={{ color: C.white }}>{s.v}</div>
                  <div className="text-xs" style={{ color: C.slate400 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card mock */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 rounded-3xl p-6 relative" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-medium" style={{ color: C.indigo300 }}>PRIYA SHARMA · HDFC HOME LOAN</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: C.white }}>June EMI — ₹34,200</p>
                </div>
                <RiskBadge level="LOW" size="sm" />
              </div>

              {/* Gauge */}
              <div className="flex justify-center py-2">
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                  <RiskGauge level="LOW" score={24} />
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} color={C.em500} />
                  <span className="text-sm font-medium" style={{ color: C.em400 }}>On Track — No action needed</span>
                </div>
                <p className="text-xs mt-1" style={{ color: C.indigo300 }}>Next EMI in 12 days · Balance sufficient</p>
              </div>

              {/* Signals mini */}
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: 'EMI Burden', val: 28, color: C.em500 },
                  { label: 'Balance Cover', val: 82, color: C.em500 },
                  { label: 'Income Buffer', val: 65, color: C.em500 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: C.indigo300 }}>{s.label}</span>
                      <span style={{ color: C.white }}>{s.val}%</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-1 rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6" style={{ background: C.slate50 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: C.navy600 }}>How it works</p>
            <h2 className="text-4xl font-bold" style={{ color: C.navy900 }}>From connection to confidence in 4 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_12px)] w-6 z-10">
                    <ChevronRight size={20} color={C.slate300} />
                  </div>
                )}
                <div className="rounded-2xl p-6 h-full" style={{ background: C.white, border: `1px solid ${C.slate200}`, boxShadow: '0 1px 4px rgba(4,13,31,0.06)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.navy500})` }}>
                    <s.icon size={20} color={C.white} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: C.navy600 }}>Step {i + 1}</div>
                  <h3 className="text-base font-bold mb-2" style={{ color: C.navy900 }}>{s.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.slate500 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: C.navy600 }}>Features</p>
            <h2 className="text-4xl font-bold" style={{ color: C.navy900 }}>Everything you need to stay default-free</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ border: `1px solid ${C.slate200}`, background: C.white }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: C.slate100 }}>
                  <f.icon size={20} color={C.navy600} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: C.navy900 }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.slate500 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 px-6" style={{ background: `linear-gradient(135deg, ${C.navy900}, ${C.navy800})` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Lock, label: 'AES-256 Encryption' },
              { icon: Lock, label: 'Full PII Masking' },
              { icon: ShieldCheck, label: 'RBI AA Framework' },
              { icon: Activity, label: 'Audit-Logged Access' },
              { icon: UserCheck, label: 'ISO 27001 Certified' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(100,128,228,0.15)', border: '1px solid rgba(100,128,228,0.25)' }}>
                  <b.icon size={16} color={C.indigo300} />
                </div>
                <span className="text-sm font-medium" style={{ color: C.indigo300 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6" style={{ background: C.slate50 }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-extrabold mb-1" style={{ color: C.navy700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
              <div className="text-sm" style={{ color: C.slate500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: C.navy900 }}>What borrowers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Arjun Mehta', role: 'Software Engineer, Pune', text: 'EMI Health alerted me 10 days before my balance would have been insufficient. Saved my CIBIL score completely.' },
              { name: 'Kavya Nair', role: 'Freelancer, Bangalore', text: "The AI chat answered my extension query in seconds with the exact policy clause. I didn't need to call the bank." },
              { name: 'Ravi Shankar', role: 'Small business owner, Chennai', text: 'Managing 3 loans was stressful. Now I get a single risk score every morning. Complete peace of mind.' },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ border: `1px solid ${C.slate200}`, background: C.slate50 }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={C.am500} color={C.am500} />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.slate600 }}>"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm" style={{ color: C.navy900 }}>{t.name}</div>
                  <div className="text-xs" style={{ color: C.slate400 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6" style={{ background: `linear-gradient(160deg, ${C.navy900}, ${C.navy700})` }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: C.white }}>Start protecting your EMIs today</h2>
          <p className="mb-8" style={{ color: C.indigo300 }}>Free forever for your first loan. No credit card required.</p>
          <PrimaryButton onClick={() => onNavigate('dashboard')} className="text-lg px-10 py-4">
            Check My Risk Free <ArrowRight size={20} />
          </PrimaryButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ background: C.navy950, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
                <ShieldCheck size={14} color={C.white} />
              </div>
              <span className="font-bold" style={{ color: C.white }}>EMI Health</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: C.slate500 }}>AI-powered EMI risk prevention for India's loan borrowers.</p>
            <div className="flex gap-3 mt-4">
              {[MessageSquare, Zap, ShieldCheck].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-700" style={{ background: C.slate800 }}>
                  <Icon size={14} color={C.slate400} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Product', links: ['Risk Check', 'Ask AI', 'Reminders', 'Dashboard'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms', 'Security', 'Cookie Policy'] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-sm font-semibold mb-3" style={{ color: C.slate400 }}>{col.title}</div>
              <div className="flex flex-col gap-2">
                {col.links.map(l => (
                  <a key={l} href="#" className="text-sm transition-colors hover:text-slate-300" style={{ color: C.slate500 }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t flex flex-col md:flex-row justify-between gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: C.slate600 }}>© 2025 EMI Health Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-xs" style={{ color: C.slate600 }}>NBFC Partner: Finvest Capital · RBI Registered</p>
        </div>
      </footer>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

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

function MobileFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.slate500 }}>{title}</p>
      {/* iPhone frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 375,
          height: 812,
          borderRadius: 44,
          background: C.white,
          border: `8px solid ${C.slate800}`,
          boxShadow: '0 32px 80px rgba(4,13,31,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Notch */}
        <div className="flex-shrink-0 flex justify-center pt-3" style={{ height: 44 }}>
          <div style={{ width: 120, height: 30, background: C.slate800, borderRadius: 20 }} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

function MobileBottomBar({ active }: { active: string }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'risk', icon: Activity, label: 'Risk' },
    { id: 'chat', icon: MessageSquare, label: 'Ask AI' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]
  return (
    <div className="flex items-center justify-around px-2 py-3 border-t" style={{ background: C.white, borderColor: C.slate200 }}>
      {tabs.map(t => (
        <button key={t.id} className="flex flex-col items-center gap-1">
          <t.icon size={20} color={active === t.id ? C.navy600 : C.slate400} strokeWidth={active === t.id ? 2.5 : 1.5} />
          <span className="text-[10px] font-medium" style={{ color: active === t.id ? C.navy600 : C.slate400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

function MobileOnboarding() {
  const [selected, setSelected] = useState<string | null>(null)
  const banks = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'PNB']
  return (
    <div className="flex flex-col h-full" style={{ background: `linear-gradient(160deg, ${C.navy950}, ${C.navy800})` }}>
      <div className="flex-1 flex flex-col px-6 pt-8">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(100,128,228,0.2)' }}>
            <ShieldCheck size={16} color={C.indigo300} />
          </div>
          <span className="font-bold text-base" style={{ color: C.white }}>EMI Health</span>
        </div>
        <h1 className="text-2xl font-extrabold mb-2 leading-tight" style={{ color: C.white }}>
          Connect your bank to get started
        </h1>
        <p className="text-sm mb-8" style={{ color: C.indigo300 }}>Select your loan bank to securely fetch your EMI details via RBI Account Aggregator.</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {banks.map(b => (
            <button
              key={b}
              onClick={() => setSelected(b)}
              className="px-4 py-3 rounded-2xl text-sm font-medium text-left transition-all"
              style={{
                background: selected === b ? `linear-gradient(135deg, ${C.navy600}, ${C.navy500})` : 'rgba(255,255,255,0.07)',
                border: selected === b ? `1.5px solid ${C.indigo400}` : '1.5px solid rgba(255,255,255,0.1)',
                color: selected === b ? C.white : C.indigo300,
              }}
            >
              {b}
            </button>
          ))}
        </div>

        <PrimaryButton className="w-full justify-center py-4">
          Continue <ArrowRight size={16} />
        </PrimaryButton>

        <div className="mt-5 flex items-center gap-2 justify-center">
          <Lock size={12} color={C.slate500} />
          <p className="text-xs text-center" style={{ color: C.slate500 }}>Secured by RBI Account Aggregator · Read-only access</p>
        </div>
      </div>
    </div>
  )
}

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

function MobileChat() {
  const msgs = [
    { role: 'ai', text: "Hi Priya! I'm your EMI AI. How can I help with your loan today?" },
    { role: 'user', text: "What's my current risk score?" },
    { role: 'ai', text: "Your risk score is 24/100 — LOW RISK. All 5 signals are in the healthy range. Your EMI is due in 12 days and your balance fully covers it. ✅", source: "HDFC Policy v2.3 · §4.2" },
  ]
  return (
    <div className="flex flex-col h-full" style={{ background: C.slate50 }}>
      <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ background: C.white, borderColor: C.slate200 }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
          <Zap size={14} color={C.white} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: C.navy900 }}>EMI Health AI</p>
          <p className="text-xs" style={{ color: C.em500 }}>● Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.role === 'ai' && (
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.indigo400})` }}>
                <Zap size={11} color={C.white} />
              </div>
            )}
            <div className={`flex flex-col gap-1 max-w-[75%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className="px-3 py-2.5 rounded-2xl text-xs leading-relaxed"
                style={{
                  background: m.role === 'ai' ? C.white : `linear-gradient(135deg, ${C.navy600}, ${C.navy500})`,
                  color: m.role === 'ai' ? C.slate700 : C.white,
                  border: m.role === 'ai' ? `1px solid ${C.slate200}` : 'none',
                }}
              >
                {m.text}
              </div>
              {(m as any).source && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ background: C.slate100, color: C.slate500 }}>
                  <Lock size={8} /> {(m as any).source}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2">
          {["Risk score?", "Next EMI date?", "Prepayment?"].map(c => (
            <button key={c} className="flex-shrink-0 px-3 py-1 rounded-full text-xs border" style={{ border: `1px solid ${C.slate300}`, color: C.slate600, background: C.white }}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 rounded-2xl p-1" style={{ background: C.white, border: `1px solid ${C.slate300}` }}>
          <input placeholder="Ask about your loan…" className="flex-1 px-3 py-2 text-xs bg-transparent outline-none" style={{ color: C.slate800 }} />
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy700}, ${C.navy500})` }}>
            <Send size={13} color={C.white} />
          </button>
        </div>
      </div>
      <MobileBottomBar active="chat" />
    </div>
  )
}

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
