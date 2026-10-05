"use client";

import { motion } from "framer-motion";
import { Activity, Database, Server, Cpu, AlertTriangle, ShieldCheck } from "lucide-react";

export default function SystemHealth() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">System Health</h1>
        <p className="text-slate-500 font-medium">Real-time monitoring of servers, databases, and platform infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-950 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Activity size={120} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </div>
            <div className="text-5xl font-extrabold mb-2 tracking-tight">99.98%</div>
            <p className="text-slate-400 font-medium">Uptime over the last 30 days</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><Server size={24} /></div>
            <h3 className="font-bold text-slate-900 mb-1">API Latency</h3>
            <p className="text-2xl font-extrabold text-slate-700">42ms</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center">
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3"><Database size={24} /></div>
            <h3 className="font-bold text-slate-900 mb-1">DB Load</h3>
            <p className="text-2xl font-extrabold text-slate-700">14%</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center">
            <div className="h-12 w-12 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mb-3"><Cpu size={24} /></div>
            <h3 className="font-bold text-slate-900 mb-1">CPU Usage</h3>
            <p className="text-2xl font-extrabold text-slate-700">28%</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3"><ShieldCheck size={24} /></div>
            <h3 className="font-bold text-slate-900 mb-1">Security</h3>
            <p className="text-sm font-extrabold text-emerald-600">Secured</p>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={20} />
          <h2 className="text-xl font-bold text-slate-900">Recent Logs & Warnings</h2>
        </div>
        <div className="p-6 text-sm font-mono text-slate-600 space-y-3 bg-slate-50">
          <div className="flex gap-4"><span className="text-slate-400">[10:42:05]</span> <span className="text-emerald-600">INFO</span> <span>Cron job 'sync_evaluations' completed successfully.</span></div>
          <div className="flex gap-4"><span className="text-slate-400">[10:15:22]</span> <span className="text-amber-600">WARN</span> <span>High memory usage detected on worker instance 04. Auto-scaling triggered.</span></div>
          <div className="flex gap-4"><span className="text-slate-400">[09:05:11]</span> <span className="text-rose-600">ERROR</span> <span>Failed login attempt from IP 192.168.1.42 (Rate limited).</span></div>
          <div className="flex gap-4"><span className="text-slate-400">[08:30:00]</span> <span className="text-emerald-600">INFO</span> <span>Database backup 'backup_oct_01' created successfully (450MB).</span></div>
        </div>
      </motion.div>
    </div>
  );
}
