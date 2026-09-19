import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart2,
  Bell,
  Building2,
  CheckCircle,
  ChevronRight,
  Lock,
  Menu,
  MessageSquare,
  ShieldCheck,
  Star,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";
import { C } from "../constants/design";
import PrimaryButton from "../components/common/PrimaryButton";
import RiskBadge from "../components/common/RiskBadge";
import RiskGauge from "../components/common/RiskGauge";
import type { Screen } from "../types/navigation";

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
            <Link
              to="/product"
              className="text-sm font-medium transition-colors hover:text-navy-600"
              style={{ color: C.slate600 }}
            >
              Product
            </Link>

            <Link
              to="/how-it-works"
              className="text-sm font-medium transition-colors hover:text-navy-600"
              style={{ color: C.slate600 }}
            >
              How it works
            </Link>

            <Link
              to="/security"
              className="text-sm font-medium transition-colors hover:text-navy-600"
              style={{ color: C.slate600 }}
            >
              Security
            </Link>

            <Link
              to="/login"
              className="text-sm font-medium transition-colors hover:text-navy-600"
              style={{ color: C.slate600 }}
            >
              Login
            </Link>
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
export default LandingPage;