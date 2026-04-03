import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  name: string;
  value: number | string;
  change: number;
  prefix?: string;
  suffix?: string;
}

export default function MetricCard({ name, value, change, prefix = "", suffix = "" }: MetricCardProps) {
  const positive = change >= 0;

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <p className="text-sm text-slate-400 mb-3">{name}</p>
      <p className="text-2xl font-bold text-white mb-3">
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </p>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
        {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        <span>{positive ? "+" : ""}{change}% vs last month</span>
      </div>
    </div>
  );
}
