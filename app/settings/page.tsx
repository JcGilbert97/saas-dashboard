import { supabase } from "@/lib/supabase";
import { User, Bell, Key, Shield, Zap } from "lucide-react";
import NotificationPrefs from "./NotificationPrefs";
import ApiKeys from "./ApiKeys";

export const revalidate = 60;

export default async function SettingsPage() {
  const [prefsRes, keysRes] = await Promise.all([
    supabase.from("notification_prefs").select("*"),
    supabase.from("api_keys").select("*").order("created_at"),
  ]);

  const prefs = prefsRes.data ?? [];
  const keys = keysRes.data ?? [];

  return (
    <div className="p-6 max-w-[860px]">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Section icon={User} title="Profile" description="Your personal details">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
            JG
          </div>
          <div>
            <p className="text-sm font-medium text-white">JcGilbert97</p>
            <p className="text-xs text-slate-500 mt-0.5">Admin · Enterprise plan</p>
          </div>
          <button className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
            Change avatar
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name" value="JC Gilbert" />
          <Field label="Username" value="JcGilbert97" />
          <Field label="Email" value="jcgilbert97@gmail.com" />
          <Field label="Timezone" value="America/New_York" />
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton />
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications" description="Choose what you get notified about">
        <NotificationPrefs prefs={prefs} />
      </Section>

      {/* API Keys */}
      <Section icon={Key} title="API Keys" description="Manage keys for programmatic access">
        <ApiKeys keys={keys} />
      </Section>

      {/* Security */}
      <Section icon={Shield} title="Security" description="Password and authentication">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-slate-200">Password</p>
              <p className="text-xs text-slate-500 mt-0.5">Last changed 3 months ago</p>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-slate-200">Two-factor authentication</p>
              <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-medium">Not enabled</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-slate-200">Active sessions</p>
              <p className="text-xs text-slate-500 mt-0.5">2 devices logged in</p>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
              Manage
            </button>
          </div>
        </div>
      </Section>

      {/* Danger zone */}
      <Section icon={Zap} title="Danger Zone" description="Irreversible account actions" danger>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-200">Delete account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently remove your account and all data</p>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
            Delete account
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon, title, description, children, danger = false,
}: {
  icon: React.ElementType; title: string; description: string; children: React.ReactNode; danger?: boolean;
}) {
  return (
    <div className={`mb-6 bg-[#13161f] border rounded-xl overflow-hidden ${danger ? "border-red-500/20" : "border-white/5"}`}>
      <div className={`flex items-center gap-3 px-5 py-4 border-b ${danger ? "border-red-500/20" : "border-white/5"}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${danger ? "bg-red-500/10" : "bg-white/5"}`}>
          <Icon size={14} className={danger ? "text-red-400" : "text-slate-400"} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${danger ? "text-red-400" : "text-white"}`}>{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
      <input
        defaultValue={value}
        className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500/50"
      />
    </div>
  );
}

function SaveButton() {
  return (
    <button className="text-xs px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors">
      Save changes
    </button>
  );
}
