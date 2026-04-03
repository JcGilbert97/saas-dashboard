"use client";
import { useState } from "react";

interface Pref { id: string; category: string; email: boolean; slack: boolean; in_app: boolean; }

export default function NotificationPrefs({ prefs }: { prefs: Pref[] }) {
  const [state, setState] = useState(prefs);

  function toggle(id: string, channel: "email" | "slack" | "in_app") {
    setState((prev) => prev.map((p) => p.id === id ? { ...p, [channel]: !p[channel] } : p));
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-3 text-xs text-slate-500 px-1">
        <span className="col-span-1">Event</span>
        <span className="text-center">Email</span>
        <span className="text-center">Slack</span>
        <span className="text-center">In-app</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {state.map((pref) => (
          <div key={pref.id} className="grid grid-cols-4 items-center gap-2 py-3 px-1">
            <span className="text-sm text-slate-300 col-span-1">{pref.category}</span>
            {(["email", "slack", "in_app"] as const).map((ch) => (
              <div key={ch} className="flex justify-center">
                <button
                  onClick={() => toggle(pref.id, ch)}
                  className={`w-8 h-4.5 rounded-full transition-colors relative ${pref[ch] ? "bg-violet-600" : "bg-white/10"}`}
                  style={{ height: 18, width: 32 }}
                >
                  <span
                    className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${pref[ch] ? "left-[14px]" : "left-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
