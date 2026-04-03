import { supabase } from "@/lib/supabase";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import ActivityFeed from "@/components/ActivityFeed";
import CustomersTable from "@/components/CustomersTable";
import { RefreshCw } from "lucide-react";

const metricConfig: Record<string, { prefix?: string; suffix?: string }> = {
  "Total Revenue": { prefix: "$" },
  "Active Users": {},
  "New Signups": {},
  "Churn Rate": { suffix: "%" },
};

export const revalidate = 60;

export default async function Dashboard() {
  const [metricsRes, revenueRes, activityRes, customersRes] = await Promise.all([
    supabase.from("metrics").select("*").order("created_at"),
    supabase.from("revenue_data").select("*").order("created_at"),
    supabase.from("activity").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("customers").select("*").order("mrr", { ascending: false }),
  ]);

  const metrics = metricsRes.data ?? [];
  const revenue = revenueRes.data ?? [];
  const activity = activityRes.data ?? [];
  const customers = customersRes.data ?? [];

  const now = new Date();
  const timeStr = now.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back — here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <RefreshCw size={12} />
          <span>Updated {timeStr}</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => {
          const cfg = metricConfig[m.name] ?? {};
          return (
            <MetricCard
              key={m.id}
              name={m.name}
              value={m.value}
              change={m.change}
              prefix={cfg.prefix}
              suffix={cfg.suffix}
            />
          );
        })}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <RevenueChart data={revenue} />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomersTable customers={customers} />
        </div>
        <div>
          <ActivityFeed items={activity} />
        </div>
      </div>
    </div>
  );
}
