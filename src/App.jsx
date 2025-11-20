import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import QuickScan from './components/QuickScan'
import Report from './components/Report'
import UseCases from './components/UseCases'
import ContactPitch from './components/ContactPitch'
import Dashboard from './components/Dashboard'

function App() {
  const [useCases, setUseCases] = useState([
    { category: 'marketing', title: 'Social media calendar', description: 'Automatisch posts genereren en plannen.' },
    { category: 'analyse', title: 'KPI samenvattingen', description: 'Wekelijkse inzichten en trends.' },
    { category: 'klantenservice', title: 'FAQ chatbot', description: 'Snelle antwoorden met je eigen kennisbank.' },
    { category: 'hr', title: 'Vacature screening', description: 'CV\'s scoren en samenvatten met AI.' }
  ])
  const [report, setReport] = useState(null)

  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/use-cases`)
        const data = await res.json()
        if (data.items) setUseCases(data.items)
      } catch {}
    }
    fetchUseCases()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/40 border-b border-blue-500/10 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white font-bold">Flomote</div>
          <nav className="flex items-center gap-6 text-blue-100">
            <a href="#quickscan" className="hover:text-white transition">QuickScan</a>
            <a href="#usecases" className="hover:text-white transition">Use Cases</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onStart={() => document.getElementById('quickscan')?.scrollIntoView({ behavior: 'smooth' })} />

        <div id="quickscan">
          <QuickScan onReport={setReport} />
        </div>

        <Report report={report} />

        <UseCases items={useCases} />

        <div id="contact">
          <ContactPitch />
        </div>

        <Dashboard />
      </main>

      <footer className="border-t border-blue-500/10 py-8 text-center text-blue-200/70">
        © {new Date().getFullYear()} Flomote — Slimmer werken met AI
      </footer>
    </div>
  )
}

export default App
