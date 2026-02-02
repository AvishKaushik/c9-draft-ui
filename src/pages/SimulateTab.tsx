import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { draftApi } from '../api/draft'
import TeamSearch from '../components/TeamSearch'
import Loading from '../components/Loading'

export default function SimulateTab() {
  const [selectedOpponent, setSelectedOpponent] = useState<{ id: string; name: string } | null>(null)
  const [ourSide, setOurSide] = useState<'blue' | 'red'>('blue')

  const simulateMutation = useMutation({
    mutationFn: () => draftApi.simulateDraft('125560', selectedOpponent!.id, ourSide),
  })

  const handleSimulate = () => {
    if (selectedOpponent) {
      simulateMutation.mutate()
    }
  }

  const simulation = simulateMutation.data

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Setup */}
      <div className="card overflow-visible">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Draft Simulation</h2>
        <p className="text-sm text-slate-500 mb-4">
          Simulate a complete draft against an opponent with AI making picks/bans.
        </p>

        {/* Side Selection */}
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">Our Side</p>
          <div className="flex gap-3">
            <button
              onClick={() => setOurSide('blue')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                ourSide === 'blue'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              Blue Side
            </button>
            <button
              onClick={() => setOurSide('red')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                ourSide === 'red'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              Red Side
            </button>
          </div>
        </div>

        {/* Opponent Search */}
        <div className="mb-4">
          <label className="text-sm text-slate-600 mb-2 block">Select Opponent</label>
          <TeamSearch
            selectedTeam={selectedOpponent}
            onSelectTeam={setSelectedOpponent}
            placeholder="Search LoL team..."
          />
        </div>

        {selectedOpponent && (
          <div className="bg-red-50 rounded-lg p-3 mb-4">
            <span className="text-sm text-slate-600">vs </span>
            <span className="font-semibold text-red-700">{selectedOpponent.name}</span>
          </div>
        )}

        <button
          onClick={handleSimulate}
          disabled={!selectedOpponent || simulateMutation.isPending}
          className="btn btn-primary"
        >
          <Sparkles size={16} className="mr-2" />
          Run Simulation
        </button>
      </div>

      {/* Loading */}
      {simulateMutation.isPending && <Loading message="Simulating draft..." />}

      {/* Simulation Results */}
      {simulation && (
        <div className="space-y-6 animate-fade-in">
          {/* Teams */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Blue Side */}
            <div className="card">
              <h3 className="font-semibold text-blue-700 mb-3">Blue Side</h3>
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">Bans</p>
                <div className="flex flex-wrap gap-1">
                  {(ourSide === 'blue' ? simulation.our_bans : simulation.their_bans)?.map((b: string, i: number) => (
                    <span key={i} className="badge badge-red">{b}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Picks</p>
                <div className="flex flex-wrap gap-1">
                  {(ourSide === 'blue' ? simulation.our_picks : simulation.their_picks)?.map((p: string, i: number) => (
                    <span key={i} className="badge badge-blue">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Red Side */}
            <div className="card">
              <h3 className="font-semibold text-red-700 mb-3">Red Side</h3>
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">Bans</p>
                <div className="flex flex-wrap gap-1">
                  {(ourSide === 'red' ? simulation.our_bans : simulation.their_bans)?.map((b: string, i: number) => (
                    <span key={i} className="badge badge-red">{b}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Picks</p>
                <div className="flex flex-wrap gap-1">
                  {(ourSide === 'red' ? simulation.our_picks : simulation.their_picks)?.map((p: string, i: number) => (
                    <span key={i} className="badge badge-blue">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Win Probability */}
          {simulation.win_probability !== undefined && (
            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-2">Predicted Win Probability</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-200 rounded-full h-4">
                  <div
                    className={`rounded-full h-4 transition-all ${
                      simulation.win_probability >= 0.5 ? 'bg-c9-blue' : 'bg-red-500'
                    }`}
                    style={{ width: `${simulation.win_probability * 100}%` }}
                  />
                </div>
                <span className={`font-bold text-lg ${
                  simulation.win_probability >= 0.5 ? 'text-c9-blue' : 'text-red-500'
                }`}>
                  {(simulation.win_probability * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          )}

          {/* Analysis */}
          {simulation.analysis && (
            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-3">Analysis</h3>
              <p className="text-slate-600 leading-relaxed">{simulation.analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
