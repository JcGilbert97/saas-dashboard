"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PlanData { plan: string; count: number; mrr: number; }

const COLORS: Record<string, string> = {
  enterprise: "#7c3aed",
  pro: "#0ea5e9",
  starter: "#10b981",
  free: "#475569",
};

export default function PlanDonut({ data }: { data: PlanData[] }) {
  const totalCustomers = data.reduce((s, d) => s + d.count, 0);
  const totalMRR = data.reduce((s, d) => s + d.mrr, 0);

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Plan Distribution</h2>
        <p className="text-xs text-slate-500 mt-0.5">{totalCustomers} customers · ${totalMRR.toLocaleString()} MRR</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
                nameKey="plan"
              >
                {data.map((entry) => (
                  <Cell key={entry.plan} fill={COLORS[entry.plan] ?? "#475569"} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e2330", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                formatter={(value, name) => [Number(value) + " customers", name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 min-w-[140px]">
          {data.map((d) => (
            <div key={d.plan} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[d.plan] ?? "#475569" }} />
                <span className="text-xs text-slate-300 capitalize">{d.plan}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-slate-200">{d.count}</span>
                <span className="text-xs text-slate-500 ml-1">({Math.round(d.count / totalCustomers * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
