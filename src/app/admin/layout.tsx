"use client";

import { ShieldAlert, LayoutDashboard, Users, FileText, Activity, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "System Overview", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Compliance Reports", href: "/admin/reports", icon: FileText },
    { name: "System Health", href: "/admin/health", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col sticky top-0 h-screen shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 mb-2 border-b border-slate-800">
          <div className="bg-rose-600 p-2 rounded-xl text-white shadow-md shadow-rose-600/20">
            <ShieldAlert size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Nexus<span className="text-rose-500">Admin</span>
          </span>
        </div>

        <div className="px-4 py-2 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Master Control</div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative group">
                  {isActive && (
                    <motion.div layoutId="activeAdminTab" className="absolute inset-0 bg-slate-800 rounded-xl" />
                  )}
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? "text-rose-400 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                    <item.icon size={20} className={isActive ? "text-rose-400" : "text-slate-500"} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group">
            <LogOut size={20} className="text-slate-500 group-hover:text-rose-400" />
            System Exit
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen relative">
        <main className="flex-1 p-8 overflow-x-hidden relative">
           {children}
        </main>
      </div>
    </div>
  );
}
