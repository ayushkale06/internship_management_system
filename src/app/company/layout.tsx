"use client";

import { Building2, LayoutDashboard, Briefcase, Users, Calendar, Settings, Bell, Search, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/company", icon: LayoutDashboard },
    { name: "Manage Postings", href: "/company/postings", icon: Briefcase },
    { name: "Review Applications", href: "/company/applications", icon: Users },
    { name: "Interviews", href: "/company/interviews", icon: Calendar },
    { name: "Settings", href: "/company/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden lg:flex sticky top-0 h-screen shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 mb-2 border-b border-slate-800">
          <div className="bg-teal-500 p-2 rounded-xl text-slate-900 shadow-md shadow-teal-500/20">
            <Building2 size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Nexus<span className="text-teal-400">Employer</span>
          </span>
        </div>

        <div className="px-4 py-2 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Company Portal</div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative group">
                  {isActive && (
                    <motion.div
                      layoutId="activeCompanyTab"
                      className="absolute inset-0 bg-slate-800 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                    isActive ? "text-teal-400 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}>
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group">
            <LogOut size={20} className="text-slate-500 group-hover:text-rose-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Topbar */}
        <header className="h-[72px] bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="max-w-md w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search candidates, postings..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm active:scale-95">
              + Post Internship
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="relative p-2 text-slate-400 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">TechNova Solutions</div>
                <div className="text-xs font-medium text-slate-500">San Francisco, CA</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                <Building2 size={20} className="text-slate-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-x-hidden relative">
           {children}
        </main>
      </div>
    </div>
  );
}
