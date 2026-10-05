"use client";

import { UserCircle, LayoutDashboard, Briefcase, FileText, Settings, LogOut, CheckCircle2, HelpCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Tracker", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/applications", icon: CheckCircle2 },
    { name: "Interviews", href: "/dashboard/interviews", icon: Calendar }, // Feature 3: Added link
    { name: "Job Board", href: "/dashboard/internships", icon: Briefcase },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white flex flex-col sticky top-0 h-screen shadow-xl shadow-slate-200/50 z-20 border-r border-slate-200">
        <div className="p-6 flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200">
            <UserCircle size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">StudentPortal</span>
        </div>

        <div className="px-4 py-2 flex-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Menu</div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative group">
                  {isActive && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-50 rounded-xl" />
                  )}
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
                    <item.icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors group">
            <LogOut size={20} className="text-slate-400 group-hover:text-rose-500" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        <header className="h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
          <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Spring 2024 Semester
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/feedback" className="bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-100 transition-colors">
              Submit Feedback
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-x-hidden relative">
           {children}
        </main>
      </div>
    </div>
  );
}
