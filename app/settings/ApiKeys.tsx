"use client";
import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ApiKey { id: string; name: string; key_prefix: string; scopes: string[]; last_used_at: string | null; created_at: string; }

export default function ApiKeys({ keys }: { keys: ApiKey[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(id: string, prefix: string) {
    navigator.clipboard.writeText(prefix + "••••••••••••••••");
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="space-y-3 mb-4">
        {keys.map((k) => (
          <div key={k.id} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/5 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-slate-200">{k.name}</p>
                {k.scopes.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{s}</span>
                ))}
              </div>
              <p className="text-xs font-mono text-slate-500">
                {k.key_prefix}••••••••••••••••
                {k.last_used_at && (
                  <span className="ml-3 not-italic font-sans">
                    Last used {formatDistanceToNow(new Date(k.last_used_at), { addSuffix: true })}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1 ml-3">
              <button
                onClick={() => copy(k.id, k.key_prefix)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
              >
                {copied === k.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
              <button className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors">
        + Generate new key
      </button>
    </div>
  );
}
