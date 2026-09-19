import type { ReactNode } from "react";
import { C } from "../../constants/design";

function PrimaryButton({ children, onClick, className = '', small = false }: {
  children: ReactNode; onClick?: () => void; className?: string; small?: boolean
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
export default PrimaryButton;