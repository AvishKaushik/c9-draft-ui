import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Search, Shield, Swords, Users } from 'lucide-react'
import { draftApi } from '../api/draft'
import Loading from '../components/Loading'

export default function ChampionSearchTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [composition, setComposition] = useState<string[]>([])

  const searchMutation = useMutation({
    mutationFn: () => draftApi.searchChampions(searchQuery),
  })

  const analysisMutation = useMutation({
    mutationFn: () => draftApi.analyzeComposition(composition),
  })

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchMutation.mutate()
    }
  }

  const addToComposition = (name: string) => {
    if (composition.length < 5 && !composition.includes(name)) {
      setComposition([...composition, name])
    }
  }

  const removeFromComposition = (name: string) => {
    setComposition(composition.filter((c) => c !== name))
  }

  const handleAnalyze = () => {
    if (composition.length > 0) {
      analysisMutation.mutate()
    }
  }

  const champion = searchMutation.data?.champion
  const analysis = analysisMutation.data

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Champion Search</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search champion name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="input flex-1"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Loading */}
      {searchMutation.isPending && <Loading message="Searching..." />}

      {/* Champion Details */}
      {champion && (
        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{champion.name}</h3>
              <div className="flex gap-1 mt-1">
                {champion.roles?.map((role: string) => (
                  <span key={role} className="badge badge-blue">{role}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToComposition(champion.name)}
              disabled={composition.length >= 5 || composition.includes(champion.name)}
              className="btn btn-secondary"
            >
              Add to Comp
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Synergies */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">Synergies</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {champion.synergies?.map((s: string) => (
                  <span key={s} className="badge badge-green">{s}</span>
                ))}
              </div>
            </div>

            {/* Counters */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Swords size={14} className="text-blue-500" />
                <span className="text-sm font-medium text-slate-700">Counters</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {champion.counters?.map((c: string) => (
                  <span key={c} className="badge badge-blue">{c}</span>
                ))}
              </div>
            </div>

            {/* Countered By */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-red-500" />
                <span className="text-sm font-medium text-slate-700">Countered By</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {champion.countered_by?.map((c: string) => (
                  <span key={c} className="badge badge-red">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Composition Builder */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Composition Builder</h3>

        {composition.length === 0 ? (
          <p className="text-sm text-slate-500">Search and add champions to build a composition.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {composition.map((name) => (
                <button
                  key={name}
                  onClick={() => removeFromComposition(name)}
                  className="badge badge-blue hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {name} ×
                </button>
              ))}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analysisMutation.isPending}
              className="btn btn-primary"
            >
              Analyze Composition
            </button>
          </>
        )}
      </div>

      {/* Analysis Loading */}
      {analysisMutation.isPending && <Loading message="Analyzing composition..." />}

      {/* Analysis Results */}
      {analysis && (
        <div className="card animate-fade-in">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Composition Analysis</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Composition Type</p>
              <p className="font-semibold text-slate-800">{analysis.composition_type}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Synergy Score</p>
              <p className="font-semibold text-c9-blue">{analysis.synergy_score?.toFixed(1)}/10</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-1">Win Condition</p>
            <p className="text-slate-700">{analysis.win_condition}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-2">Power Spikes</p>
              <ul className="space-y-1">
                {analysis.power_spikes?.map((spike: string, i: number) => (
                  <li key={i} className="text-sm text-emerald-600">• {spike}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Weaknesses</p>
              <ul className="space-y-1">
                {analysis.weaknesses?.map((weak: string, i: number) => (
                  <li key={i} className="text-sm text-red-600">• {weak}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
