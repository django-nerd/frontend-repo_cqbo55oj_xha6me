import { useState } from 'react'

export default function QuickScan({ onReport }) {
  const [form, setForm] = useState({ sector: '', employees: 5, challenges: [], company_name: '' })
  const [loading, setLoading] = useState(false)

  const challengesList = [
    'marketing', 'klantenservice', 'administratie', 'analyse', 'hr', 'operations'
  ]

  const toggleChallenge = (c) => {
    setForm((f) => {
      const exists = f.challenges.includes(c)
      return { ...f, challenges: exists ? f.challenges.filter(x => x !== c) : [...f.challenges, c] }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/quickscan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: form.sector || 'overig',
          employees: Number(form.employees || 1),
          challenges: form.challenges,
          company_name: form.company_name || 'Onbekend'
        })
      })
      const data = await res.json()
      onReport(data)
    } catch (err) {
      onReport({ summary: 'Er ging iets mis. Probeer opnieuw.', recommendations: [] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-2">QuickScan</h2>
      <p className="text-blue-100/80 mb-6">Beantwoord een paar vragen en ontvang direct een adviesrapport.</p>
      <form onSubmit={submit} className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Bedrijfsnaam</label>
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white"
                 value={form.company_name}
                 onChange={(e)=>setForm({ ...form, company_name: e.target.value })}
                 placeholder="Flomote BV" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Sector</label>
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white"
                 value={form.sector}
                 onChange={(e)=>setForm({ ...form, sector: e.target.value })}
                 placeholder="bijv. SaaS, Retail, Zorg" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Aantal medewerkers</label>
          <input type="number" min={1} max={500}
                 className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white"
                 value={form.employees}
                 onChange={(e)=>setForm({ ...form, employees: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">Huidige uitdagingen</label>
          <div className="flex flex-wrap gap-2">
            {challengesList.map(c => (
              <button type="button" key={c}
                onClick={() => toggleChallenge(c)}
                className={(form.challenges.includes(c) ? 'bg-blue-500 text-white' : 'bg-slate-900/60 text-blue-100') + ' border border-blue-500/20 rounded-full px-3 py-1 text-sm'}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg">
            {loading ? 'Analyseren...' : 'Genereer advies'}
          </button>
        </div>
      </form>
    </section>
  )
}
