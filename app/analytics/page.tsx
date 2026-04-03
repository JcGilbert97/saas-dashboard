import { supabase } from "@/lib/supabase";
import SignupsChart from "./SignupsChart";
import PageViewsChart from "./PageViewsChart";
import PlanDonut from "./PlanDonut";
import TrafficSources from "./TrafficSources";

export const revalidate = 60;

export default async function AnalyticsPage() {
  const [signupsRes, viewsRes, plansRes, sourcesRes] = await Promise.all([
    supabase.from("signups_daily").select("*").order("date"),
    supabase.from("page_views").select("*").order("date"),
    supabase.from("plan_distribution").select("*"),
    supabase.from("traffic_sources").select("*").order("visits", { ascending: false }),
  ]);

  const signups = signupsRes.data ?? [];
  const views = viewsRes.data ?? [];
  const plans = plansRes.data ?? [];
  const sources = sourcesRes.data ?? [];

  const totalSignups = signups.reduce((s, d) => s + d.signups, 0);
  const totalChurned = signups.reduce((s, d) => s + d.churned, 0);
  const totalViews = views.reduce((s, d) => s + d.views, 0);
  const avgBounce = views.length ? (views.reduce((s, d) => s + d.bounce_rate, 0) / views.length).toFixed(1) : "0";

  const kpis = [
    { label: "Signups (30d)", value: totalSignups.toLocaleString(), change: "+23%", up: true },
    { label: "Churned (30d)", value: totalChurned.toLocaleString(), change: "-12%", up: false },
    { label: "Page Views (30d)", value: totalViews.toLocaleString(), change: "+31%", up: true },
    { label: "Avg Bounce Rate", value: `${avgBounce}%`, change: "-4.2%", up: false },
  ];

  return (
    <div className="p-6 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Last 30 days</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#13161f] border border-white/5 rounded-xl p-5">
            <p className="text-xs text-slate-500 mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-white mb-2">{k.value}</p>
            <span className={`text-xs font-medium ${k.up ? "text-emerald-400" : "text-red-400"}`}>
              {k.change} vs prev 30d
            </span>
          </div>
        ))}
      </div>

      {/* Signups + Page views charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SignupsChart data={signups} />
        <PageViewsChart data={views} />
      </div>

      {/* Plan distribution + Traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanDonut data={plans} />
        <TrafficSources data={sources} />
      </div>
    </div>
  );
}
