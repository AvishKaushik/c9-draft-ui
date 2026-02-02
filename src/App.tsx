import { useState } from 'react'
import Header from './components/Header'
import TabBar from './components/TabBar'
import DraftBoardTab from './pages/DraftBoardTab'
import SimulateTab from './pages/SimulateTab'
import MetaChampionsTab from './pages/MetaChampionsTab'
import ChampionSearchTab from './pages/ChampionSearchTab'
import HistoryTab from './pages/HistoryTab'

export default function App() {
  const [activeTab, setActiveTab] = useState('draft')

  const renderTab = () => {
    switch (activeTab) {
      case 'draft':
        return <DraftBoardTab />
      case 'simulate':
        return <SimulateTab />
      case 'meta':
        return <MetaChampionsTab />
      case 'champions':
        return <ChampionSearchTab />
      case 'history':
        return <HistoryTab />
      default:
        return <DraftBoardTab />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-6">
        {renderTab()}
      </main>
    </div>
  )
}
