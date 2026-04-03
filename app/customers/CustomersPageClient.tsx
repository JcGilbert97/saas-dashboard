"use client";
import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  mrr: number;
  created_at: string;
}

const planColor: Record<string, string> = {
  enterprise: "text-violet-400 bg-violet-400/10",
  pro: "text-sky-400 bg-sky-400/10",
  starter: "text-emerald-400 bg-emerald-400/10",
  free: "text-slate-400 bg-slate-400/10",
};

const statusColor: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-400/10",
  trial: "text-amber-400 bg-amber-400/10",
  churned: "text-red-400 bg-red-400/10",
};

type SortKey = "name" | "plan" | "status" | "mrr" | "created_at";

export default function CustomersPageClient({ customers }: { customers: Customer[] }) {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });

  const filtered = useMemo(() => {
    let list = customers.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q)) return false;
      if (planFilter !== "all" && c.plan !== planFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      return true;
    });

    list.sort((a, b) => {
      let av: string | number = a[sort.key] ?? "";
      let bv: string | number = b[sort.key] ?? "";
      if (sort.key === "mrr") { av = Number(av); bv = Number(bv); }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [customers, search, planFilter, statusFilter, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sort.key !== col) return <ChevronsUpDown size={12} className="text-slate-600" />;
    return sort.dir === "asc" ? <ChevronUp size={12} className="text-violet-400" /> : <ChevronDown size={12} className="text-violet-400" />;
  }

  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-white/5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
          />
        </div>

        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50"
        >
          <option value="all">All plans</option>
          <option value="enterprise">Enterprise</option>
          <option value="pro">Pro</option>
          <option value="starter">Starter</option>
          <option value="free">Free</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="churned">Churned</option>
        </select>

        <span className="text-xs text-slate-500 ml-auto">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-white/5">
              {[
                { label: "Customer", key: "name" as SortKey },
                { label: "Plan", key: "plan" as SortKey },
                { label: "Status", key: "status" as SortKey },
                { label: "MRR", key: "mrr" as SortKey },
                { label: "Joined", key: "created_at" as SortKey },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="text-left px-4 py-3 font-medium cursor-pointer hover:text-slate-300 transition-colors select-none"
                  onClick={() => toggleSort(key)}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    <SortIcon col={key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filtered.map((c) => {
              const initials = c.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
              return (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/40 to-sky-500/40 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize ${planColor[c.plan] ?? "text-slate-400 bg-slate-400/10"}`}>
                      {c.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize ${statusColor[c.status] ?? "text-slate-400 bg-slate-400/10"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">
                    {c.mrr > 0 ? `$${c.mrr.toLocaleString()}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-slate-500">
                  No customers match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
