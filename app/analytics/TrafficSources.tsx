interface Source { source: string; visits: number; conversions: number; }

export default function TrafficSources({ data }: { data: Source[] }) {
  const maxVisits = Math.max(...data.map((d) => d.visits));

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Traffic Sources</h2>
        <p className="text-xs text-slate-500 mt-0.5">Visits & conversion rate</p>
      </div>
      <div className="space-y-4">
        {data.map((d) => {
          const cvr = ((d.conversions / d.visits) * 100).toFixed(1);
          const pct = (d.visits / maxVisits) * 100;
          return (
            <div key={d.source}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">{d.source}</span>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{d.visits.toLocaleString()} visits</span>
                  <span className="text-emerald-400 font-medium">{cvr}% CVR</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
