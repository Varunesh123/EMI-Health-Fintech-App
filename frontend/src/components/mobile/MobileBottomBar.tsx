import {
    Activity,
    Bell,
    Home,
    MessageSquare,
    Settings,
  } from "lucide-react";
  import { C } from "../../constants/design";
  
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
  export default MobileBottomBar;