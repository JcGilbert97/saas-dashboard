interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  mrr: number;
}

const planColor: Record<string, string> = {
  enterprise: "text-violet-400 bg-violet-400/10",
  pro: "text-sky-400 bg-sky-400/10",
  starter: "text-emerald-400 bg-emerald-400/10",
  free: "text-slate-400 bg-slate-400/10",
};

const statusColor: Record<string, string> = {
  active: "text-emerald-400",
  trial: "text-amber-400",
  churned: "text-red-400",
};

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-white">Customers</h2>
        <span className="text-xs text-slate-500">{customers.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-white/5">
              <th className="text-left pb-3 font-medium">Customer</th>
              <th className="text-left pb-3 font-medium">Plan</th>
              <th className="text-left pb-3 font-medium">Status</th>
              <th className="text-right pb-3 font-medium">MRR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((c) => (
              <tr key={c.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-3">
                  <div>
                    <p className="text-slate-200 font-medium">{c.name}</p>
                    <p className="text-slate-500 text-xs">{c.email}</p>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize ${planColor[c.plan] ?? "text-slate-400 bg-slate-400/10"}`}>
                    {c.plan}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full bg-current ${statusColor[c.status] ?? "text-slate-400"}`} />
                    <span className={`text-xs capitalize ${statusColor[c.status] ?? "text-slate-400"}`}>{c.status}</span>
                  </div>
                </td>
                <td className="py-3 text-right text-slate-300 font-mono text-xs">
                  {c.mrr > 0 ? `$${c.mrr.toLocaleString()}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
