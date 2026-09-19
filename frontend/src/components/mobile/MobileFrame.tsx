import type { ReactNode } from "react";
import { C } from "../../constants/design.ts";

function MobileFrame({ title, children }: { title: string; children: ReactNode }) {
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
export default MobileFrame;