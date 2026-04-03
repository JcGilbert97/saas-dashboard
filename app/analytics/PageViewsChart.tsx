"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint { date: string; views: number; sessions: number; bounce_rate: number; }

export default function PageViewsChart({ data }: { data: DataPoint[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  const tickFormatter = (_: string, index: number) => index % 5 === 0 ? formatted[index]?.label ?? "" : "";

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Page Views & Sessions</h2>
        <p className="text-xs text-slate-500 mt-0.5">Daily over last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2330" />
          <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={tickFormatter} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v} />
          <Tooltip
            contentStyle={{ background: "#1e2330", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#64748b", paddingTop: 12 }} />
          <Line type="monotone" dataKey="views" stroke="#7c3aed" strokeWidth={2} dot={false} name="Views" />
          <Line type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} dot={false} name="Sessions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
