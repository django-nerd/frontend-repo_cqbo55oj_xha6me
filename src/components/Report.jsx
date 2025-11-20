export default function Report({ report }) {
  if (!report) return null
  return (
    <section className="max-w-4xl mx-auto px-6 pb-12">
      <div className="bg-slate-800/60 border border-blue-500/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Adviesrapport</h3>
        <p className="text-blue-100/90 mb-6">{report.summary}</p>
        <div className="space-y-3">
          {report.recommendations?.map((r, i) => (
            <div key={i} className="bg-slate-900/60 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-300/80">{r.category}</div>
                  <div className="text-white font-semibold">{r.title}</div>
                </div>
                <div className="text-sm text-blue-200/80">Impact: {r.impact} · Inspanning: {r.effort}</div>
              </div>
              <p className="text-blue-100/80 mt-2">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
