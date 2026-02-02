import { Swords, PlayCircle, History, Crown, Search } from 'lucide-react'

const tabs = [
  { id: 'draft', label: 'Draft Board', icon: Swords },
  { id: 'simulate', label: 'Simulate', icon: PlayCircle },
  { id: 'meta', label: 'Meta Champions', icon: Crown },
  { id: 'champions', label: 'Champion Search', icon: Search },
  { id: 'history', label: 'Draft History', icon: History },
]

interface TabBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-c9-blue text-c9-blue'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
