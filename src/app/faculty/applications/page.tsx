"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";

// Feature 2: Faculty Interview & Application Management Board
export default function FacultyApplications() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
    return tomorrow.toISOString().slice(0, 16);
  };

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedTime = new Date(formData.get('interviewDate') as string).getTime();
    if (selectedTime < Date.now() + 24 * 60 * 60 * 1000) {
      alert("Validation Error: Interviews must be scheduled with at least 24 hours notice.");
      return;
    }
    alert("Department Interview Scheduled successfully!");
    setScheduleModalOpen(false);
  };

  const columns = [
    { title: "Pending Review", statusMatch: "Pending Review", color: "border-indigo-200 bg-indigo-50/50" },
    { title: "Shortlisted", statusMatch: "Shortlisted", color: "border-emerald-200 bg-emerald-50/50" }
  ];

  return (
    <div className="max-w-7xl mx-auto h-[80vh] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Department Application Board</h1>
        <p className="text-slate-500 font-medium">Manage student applications and schedule department interviews for faculty-posted internships.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {columns.map((col, i) => (
          <motion.div key={i} className={`rounded-3xl border ${col.color} p-4 flex flex-col`}>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-slate-800">{col.title}</h3>
            </div>
            <div className="flex-1 space-y-4">
              <motion.div layout className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="font-bold text-slate-900 mb-1">Alex Rivera</div>
                <div className="text-sm font-medium text-slate-500 mb-4">Research Assistant (CS Dept)</div>
                <div className="flex gap-2">
                  <button onClick={() => setScheduleModalOpen(true)} className="w-full py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors">
                    Schedule Interview
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {scheduleModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
                <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2"><Calendar size={20}/> Schedule Interview</h2>
                <button onClick={() => setScheduleModalOpen(false)} className="text-emerald-400 hover:text-emerald-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleScheduleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Interview Date & Time (Min 24h notice)</label>
                  <input name="interviewDate" min={getMinDateTime()} required type="datetime-local" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Platform / Location</label>
                  <select name="platform" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>Faculty Office (Room 304)</option>
                    <option>Zoom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Interviewer Details</label>
                  <input name="interviewer" required type="text" placeholder="e.g. Dr. Alan Turing" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold rounded-xl py-3 mt-2 hover:bg-emerald-700 transition-colors">
                  Confirm & Send Invite
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
