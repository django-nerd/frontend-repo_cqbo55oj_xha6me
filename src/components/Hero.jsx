import { ArrowRight } from 'lucide-react'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.15),transparent_30%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Flomote
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> — Slimmer werken met AI</span>
        </h1>
        <p className="mt-6 text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto">
          Ontdek in minuten welke processen je kunt automatiseren. Krijg direct een adviesrapport en start met ready‑to‑use workflows.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={onStart} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
            Start QuickScan
            <ArrowRight className="w-4 h-4" />
          </button>
          <a href="#usecases" className="text-blue-200 hover:text-white transition font-medium">
            Bekijk use cases
          </a>
        </div>
      </div>
    </section>
  )
}
