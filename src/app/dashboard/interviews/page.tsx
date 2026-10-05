"use client";

import { motion } from "framer-motion";
import { Calendar, Video, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudentInterviews() {
  const upcoming = [
    { id: 1, company: "TechNova Solutions", role: "Frontend Developer", date: "Tomorrow", time: "10:00 AM PST", platform: "Google Meet" },
  ];

  const past = [
    { id: 2, company: "Global Fin", role: "Data Analyst", date: "Oct 15, 2024", result: "Offer Extended", feedback: "Strong technical skills, excellent communication." },
    { id: 3, company: "Nexus Design", role: "UI/UX Intern", date: "Sep 28, 2024", result: "Rejected", feedback: "Great design eye, but missing required Figma prototyping experience." },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Interviews</h1>
        <p className="text-slate-500 font-medium">View your upcoming interview schedules and past results/feedback.</p>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Interviews</h2>
      <div className="space-y-4 mb-10">
        {upcoming.map((interview, i) => (
          <motion.div key={interview.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex flex-col items-center justify-center border border-indigo-100">
                <Calendar size={20} className="mb-1" />
                <span className="text-xs font-bold uppercase">TMRW</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{interview.company}</h3>
                <p className="text-slate-500 font-medium">{interview.role}</p>
                <div className="flex items-center gap-4 mt-2 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={16} /> {interview.time}</span>
                  <span className="flex items-center gap-1 text-indigo-500"><Video size={16} /> {interview.platform}</span>
                </div>
              </div>
            </div>
            <button className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm shrink-0">
              Join Link
            </button>
          </motion.div>
        ))}
        {upcoming.length === 0 && <p className="text-slate-500 italic">No upcoming interviews scheduled.</p>}
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Past Results & Feedback</h2>
      <div className="space-y-4">
        {past.map((interview, i) => (
          <motion.div key={interview.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{interview.company}</h3>
                <p className="text-sm font-medium text-slate-500">{interview.role} • {interview.date}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 ${interview.result === 'Offer Extended' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {interview.result === 'Offer Extended' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                {interview.result}
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-100 text-sm text-slate-600 italic">
              " {interview.feedback} "
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
