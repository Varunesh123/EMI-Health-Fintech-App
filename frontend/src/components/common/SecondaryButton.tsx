import type { ReactNode } from "react";
import { C } from "../../constants/design.ts";

function SecondaryButton({ children, onClick, className = '' }: {
  children: ReactNode; onClick?: () => void; className?: string
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
export default SecondaryButton;