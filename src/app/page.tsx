"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  const featureCards = [
    { title: "For Students", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50 border-blue-100", desc: "Build your profile, track applications in real-time, and kickstart your career journey with top firms.", href: "/dashboard/student" },
    { title: "For Companies", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100", desc: "Access verified campus talent, schedule interviews smoothly, and hire the best graduates.", href: "/company" },
    { title: "For Faculty / Admins", icon: Building, color: "text-fuchsia-600", bg: "bg-fuchsia-50 border-fuchsia-100", desc: "Monitor placements, evaluate student performance, and generate comprehensive analytics.", href: "/admin" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
            NexusIntern
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/dashboard/student" className="hover:text-indigo-600 transition-colors">Students</Link>
          <Link href="/company" className="hover:text-indigo-600 transition-colors">Companies</Link>
          <Link href="/admin" className="hover:text-indigo-600 transition-colors">Faculty</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="text-slate-600 font-semibold hover:text-slate-900 transition-colors">Log in</Link>
          <Link href="/dashboard/student" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 transition-all active:scale-95 hover:shadow-xl hover:shadow-slate-300">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-24 pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background Gradients for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-blue-500/20 blur-[120px] -z-10 rounded-full pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-700 text-sm font-bold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            System v2.0 is Live
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15]">
            Bridge the gap between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
              Campus and Career
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl font-medium leading-relaxed">
            The all-in-one college internship management platform. Connect top students with leading companies, streamline applications, and automate evaluations effortlessly.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link href="/dashboard/internships" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2 group">
              Find Internships
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/company/postings" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
              <Building className="w-5 h-5 text-slate-500" />
              Post an Opening
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating animated feature cards */}
        <div className="mt-28 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, i) => (
            <Link key={i} href={card.href}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="h-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col items-start text-left group cursor-pointer hover:border-indigo-100"
              >
                <div className={`p-4 rounded-2xl border ${card.bg} ${card.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <card.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{card.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">{card.desc}</p>
                <div className={`mt-auto font-bold ${card.color} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Learn more <ChevronRight size={18} strokeWidth={3} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
