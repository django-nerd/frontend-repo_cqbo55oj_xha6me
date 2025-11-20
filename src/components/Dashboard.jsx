import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [creating, setCreating] = useState({ title: '', category: 'marketing', description: '' })

  const load = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/workflows`)
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    await fetch(`${base}/api/workflows`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        company_name: 'Demo',
        category: creating.category,
        title: creating.title,
        description: creating.description,
        status: 'gepland'
      })
    })
    setCreating({ title: '', category: 'marketing', description: '' })
    load()
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-blue-100/80">Beheer en breid je workflows uit.</p>
      </div>

      <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6 mb-8">
        <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Titel" value={creating.title} onChange={(e)=>setCreating({...creating, title:e.target.value})} />
          <select className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" value={creating.category} onChange={(e)=>setCreating({...creating, category:e.target.value})}>
            <option value="marketing">Marketing</option>
            <option value="analyse">Analyse</option>
            <option value="klantenservice">Klantenservice</option>
            <option value="hr">HR</option>
            <option value="financien">Financiën</option>
            <option value="operations">Operations</option>
          </select>
          <input className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Korte beschrijving" value={creating.description} onChange={(e)=>setCreating({...creating, description:e.target.value})} />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg">Toevoegen</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.id || it._id} className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-5">
            <div className="text-xs uppercase tracking-wide text-blue-300/80 mb-1">{it.category}</div>
            <div className="text-white font-semibold">{it.title}</div>
            <p className="text-blue-100/80 text-sm mt-1">{it.description}</p>
            <div className="text-blue-200/80 text-sm mt-3">Status: {it.status}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
