import { useState } from 'react'

export default function ContactPitch() {
  const [contact, setContact] = useState({ name: '', email: '', company: '', message: '', topic: 'kennismaking' })
  const [pitch, setPitch] = useState({ name: '', company: '', sector: '', pain_points: [], tone: 'vriendelijk' })
  const [pitchText, setPitchText] = useState('')

  const sendContact = async (e) => {
    e.preventDefault()
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    await fetch(`${base}/api/contact`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact)
    })
    alert('Bedankt! We nemen snel contact op.')
  }

  const generatePitch = async (e) => {
    e.preventDefault()
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/pitch`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pitch)
    })
    const data = await res.json()
    setPitchText(`${data.subject}\n\n${data.body}`)
  }

  const togglePain = (p) => {
    setPitch((prev) => ({ ...prev, pain_points: prev.pain_points.includes(p) ? prev.pain_points.filter(x=>x!==p) : [...prev.pain_points, p] }))
  }

  const pains = ['Handmatig werk', 'Social posts', 'Nieuwsbrief', 'Facturen', 'Klantenservice']

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
        <p className="text-blue-100/80 mb-4">Vraag een offerte of kennismakingsgesprek aan.</p>
        <form onSubmit={sendContact} className="space-y-3">
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Naam" value={contact.name} onChange={(e)=>setContact({...contact, name:e.target.value})} />
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="E-mail" value={contact.email} onChange={(e)=>setContact({...contact, email:e.target.value})} />
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Bedrijf" value={contact.company} onChange={(e)=>setContact({...contact, company:e.target.value})} />
          <textarea className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Bericht" rows={4} value={contact.message} onChange={(e)=>setContact({...contact, message:e.target.value})} />
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg">Versturen</button>
          </div>
        </form>
      </div>

      <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Pitchmail generator</h3>
        <p className="text-blue-100/80 mb-4">Maak in één klik een persoonlijke pitch.</p>
        <form onSubmit={generatePitch} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Naam" value={pitch.name} onChange={(e)=>setPitch({...pitch, name:e.target.value})} />
            <input className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Bedrijf" value={pitch.company} onChange={(e)=>setPitch({...pitch, company:e.target.value})} />
          </div>
          <input className="w-full bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" placeholder="Sector" value={pitch.sector} onChange={(e)=>setPitch({...pitch, sector:e.target.value})} />
          <div className="flex flex-wrap gap-2">
            {pains.map(p => (
              <button key={p} type="button" onClick={()=>togglePain(p)}
                className={(pitch.pain_points.includes(p)?'bg-blue-500 text-white':'bg-slate-900/60 text-blue-100') + ' border border-blue-500/20 rounded-full px-3 py-1 text-sm'}>{p}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-blue-100/80 text-sm">Toon</label>
            <select className="bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 text-white" value={pitch.tone} onChange={(e)=>setPitch({...pitch, tone:e.target.value})}>
              <option value="vriendelijk">Vriendelijk</option>
              <option value="formeel">Formeel</option>
              <option value="to-the-point">To-the-point</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg">Genereer</button>
          </div>
        </form>
        {pitchText && (
          <div className="mt-4 bg-slate-900/60 border border-blue-500/20 rounded-lg p-4 text-blue-100 whitespace-pre-wrap text-sm">
            {pitchText}
          </div>
        )}
      </div>
    </section>
  )
}
