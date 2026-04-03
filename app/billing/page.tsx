import { supabase } from "@/lib/supabase";
import { CreditCard, Zap, Download, CheckCircle2, Clock } from "lucide-react";

export const revalidate = 60;

export default async function BillingPage() {
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("invoice_date", { ascending: false });

  const all = invoices ?? [];
  const totalPaid = all.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-6 max-w-[860px]">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Billing</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your subscription and invoices</p>
      </div>

      {/* Current plan */}
      <div className="bg-gradient-to-br from-violet-600/20 to-violet-800/10 border border-violet-500/20 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-violet-400" />
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Current plan</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Enterprise</h2>
            <p className="text-sm text-slate-400 mt-1">Unlimited seats · Priority support · SSO · Custom integrations</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$1,200</p>
            <p className="text-xs text-slate-500">/month</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Renews May 1, 2026</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
              Change plan
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Plan comparison */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { name: "Starter", price: "$49", features: ["5 seats", "Basic analytics", "Email support"], current: false },
          { name: "Pro", price: "$299", features: ["25 seats", "Full analytics", "Priority support"], current: false },
          { name: "Enterprise", price: "$1,200", features: ["Unlimited seats", "SSO + SAML", "Dedicated CSM"], current: true },
        ].map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-4 border ${plan.current ? "border-violet-500/40 bg-violet-600/10" : "border-white/5 bg-[#13161f]"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white">{plan.name}</p>
              {plan.current && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 font-semibold">CURRENT</span>
              )}
            </div>
            <p className="text-xl font-bold text-white mb-3">{plan.price}<span className="text-xs text-slate-500 font-normal">/mo</span></p>
            <ul className="space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div className="bg-[#13161f] border border-white/5 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard size={15} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-white">Payment method</h2>
        </div>
        <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-[9px] font-bold text-white">
              VISA
            </div>
            <div>
              <p className="text-sm text-slate-200">Visa ending in 4242</p>
              <p className="text-xs text-slate-500">Expires 08/27</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 font-medium">Default</span>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">Invoice history</h2>
          <span className="text-xs text-slate-500">${totalPaid.toLocaleString()} total paid</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {all.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  inv.status === "paid" ? "bg-emerald-400/10" : "bg-amber-400/10"
                }`}>
                  {inv.status === "paid"
                    ? <CheckCircle2 size={13} className="text-emerald-400" />
                    : <Clock size={13} className="text-amber-400" />}
                </div>
                <div>
                  <p className="text-sm text-slate-200">{inv.description}</p>
                  <p className="text-xs text-slate-500">{inv.invoice_number} · {new Date(inv.invoice_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-mono text-slate-200">${inv.amount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                  inv.status === "paid" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                }`}>{inv.status}</span>
                <button className="text-slate-600 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
