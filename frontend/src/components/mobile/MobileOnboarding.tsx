import { useState } from "react";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { C } from "../../constants/design.ts";
import PrimaryButton from "../common/PrimaryButton";

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
export default MobileOnboarding;