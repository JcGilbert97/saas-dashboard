import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  user_name: string;
  action: string;
  description: string | null;
  created_at: string;
}

const actionColor: Record<string, string> = {
  "Upgraded Plan": "text-emerald-400 bg-emerald-400/10",
  "New Signup": "text-violet-400 bg-violet-400/10",
  "Support Ticket": "text-amber-400 bg-amber-400/10",
  "Payment Failed": "text-red-400 bg-red-400/10",
  "Feature Request": "text-sky-400 bg-sky-400/10",
  "Cancelled": "text-rose-400 bg-rose-400/10",
};

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[#13161f] border border-white/5 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-white mb-5">Recent Activity</h2>
      <div className="space-y-4">
        {items.map((item) => {
          const initials = item.user_name.split(" ").map((n) => n[0]).join("").slice(0, 2);
          const badge = actionColor[item.action] ?? "text-slate-400 bg-slate-400/10";
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-200">{item.user_name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${badge}`}>{item.action}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                )}
                <p className="text-[11px] text-slate-600 mt-1">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
