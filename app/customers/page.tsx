import { supabase } from "@/lib/supabase";
import { Users, TrendingUp, DollarSign, UserX } from "lucide-react";
import CustomersPageClient from "./CustomersPageClient";

export const revalidate = 60;

export default async function CustomersPage() {
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  const all = customers ?? [];

  const totalMRR = all.reduce((s, c) => s + (c.mrr ?? 0), 0);
  const active = all.filter((c) => c.status === "active").length;
  const churned = all.filter((c) => c.status === "churned").length;
  const trial = all.filter((c) => c.status === "trial").length;

  const stats = [
    { label: "Total Customers", value: all.length, icon: Users, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "Active", value: active, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Total MRR", value: `$${totalMRR.toLocaleString()}`, icon: DollarSign, color: "text-sky-400", bg: "bg-sky-400/10" },
    { label: "Churned", value: churned, icon: UserX, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Customers</h1>
        <p className="text-sm text-slate-500 mt-0.5">{all.length} total · {trial} on trial</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#13161f] border border-white/5 rounded-xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-xl font-bold text-white mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive table */}
      <CustomersPageClient customers={all} />
    </div>
  );
}
