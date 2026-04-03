"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint { date: string; signups: number; churned: number; }

export default function SignupsChart({ data }: { data: DataPoint[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  // Show every 5th label to avoid crowding
  const tickFormatter = (_: string, index: number) => index % 5 === 0 ? formatted[index]?.label ?? "" : "";

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Signups vs Churn</h2>
        <p className="text-xs text-slate-500 mt-0.5">Daily over last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={formatted} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2330" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={tickFormatter} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#1e2330", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#94a3b8" }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#64748b", paddingTop: 12 }} />
          <Bar dataKey="signups" fill="#7c3aed" radius={[3, 3, 0, 0]} name="Signups" />
          <Bar dataKey="churned" fill="#ec4899" radius={[3, 3, 0, 0]} name="Churned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
