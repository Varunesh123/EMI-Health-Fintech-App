import { Lock, Send, Zap } from "lucide-react";
import { C } from "../../constants/design.ts";
import MobileBottomBar from "./MobileBottomBar";

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
export default MobileChat;