import c9Logo from '../assets/c9_logo.png'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={c9Logo} alt="Cloud9" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Draft Assistant</h1>
            <p className="text-xs text-slate-500">League of Legends Pick/Ban Strategy</p>
          </div>
        </div>
        <span className="badge badge-blue text-sm">LoL Only</span>
      </div>
    </header>
  )
}
