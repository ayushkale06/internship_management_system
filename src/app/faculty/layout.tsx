"use client";

import { GraduationCap, LayoutDashboard, Users, Briefcase, FileSignature, LogOut, CheckSquare, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Faculty Dashboard", href: "/faculty", icon: LayoutDashboard },
    { name: "My Postings", href: "/faculty/postings", icon: Briefcase },
    { name: "Review Applications", href: "/faculty/applications", icon: CheckSquare }, // Added access to interview scheduler
    { name: "Evaluate Students", href: "/faculty/evaluations", icon: FileSignature },
    { name: "Student Roster", href: "/faculty/students", icon: Users },
    { name: "Student Feedback", href: "/faculty/feedback", icon: MessageSquare }, // Requirement 3: Link to respond to feedback
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col sticky top-0 h-screen shadow-xl z-20 border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 mb-2 border-b border-slate-800">
          <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-md shadow-emerald-500/20">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Nexus<span className="text-emerald-400">Faculty</span>
          </span>
        </div>

        <div className="px-4 py-2 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Academic Controls</div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative group">
                  {isActive && (
                    <motion.div layoutId="activeFacultyTab" className="absolute inset-0 bg-slate-800 rounded-xl" />
                  )}
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                    <item.icon size={20} className={isActive ? "text-emerald-400" : "text-slate-500"} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group">
            <LogOut size={20} className="text-slate-500 group-hover:text-emerald-400" />
            Sign Out
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
