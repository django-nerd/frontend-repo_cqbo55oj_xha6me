export default function UseCases({ items }) {
  return (
    <section id="usecases" className="bg-slate-900/60 border-t border-blue-500/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Use Cases</h2>
        <p className="text-blue-100/80 mb-10">Voorbeelden van automatiseringen die we vaak opleveren.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c, i) => (
            <div key={i} className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-5 hover:border-blue-400/30 transition">
              <div className="text-xs uppercase tracking-wide text-blue-300/80 mb-1">{c.category}</div>
              <div className="text-white font-semibold">{c.title}</div>
              <p className="text-blue-100/80 text-sm mt-2">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
