"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Video, Clock, RefreshCw, XCircle, ClipboardCheck, X } from "lucide-react";

export default function CompanyInterviews() {
  const [resultModalOpen, setResultModalOpen] = useState<number | null>(null);
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Alex Rivera", role: "Frontend Developer", date: "Tomorrow", time: "10:00 AM PST", platform: "Google Meet" },
    { id: 2, candidate: "Jordan Smith", role: "Backend Engineer", date: "Oct 28, 2024", time: "2:30 PM PST", platform: "Zoom" },
  ]);

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Interview results and comments updated successfully in the system.");
    setInterviews(interviews.filter(i => i.id !== resultModalOpen));
    setResultModalOpen(null);
  };

  const handleReschedule = (id: number) => {
    alert("Opening rescheduling modal... an email will be sent to the candidate with new time proposals.");
  };

  const handleCancel = (id: number, candidate: string) => {
    if (confirm(`Are you sure you want to cancel the interview with ${candidate}?`)) {
      setInterviews(interviews.filter(i => i.id !== id));
      alert(`Interview with ${candidate} has been cancelled.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Upcoming Interviews</h1>
        <p className="text-slate-500 font-medium">Manage your scheduled technical screens and final rounds.</p>
      </div>

      <div className="space-y-4">
        {interviews.map((interview, i) => (
          <motion.div key={interview.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-teal-50 text-teal-600 rounded-2xl flex flex-col items-center justify-center border border-teal-100">
                <Calendar size={20} className="mb-1" />
                <span className="text-xs font-bold uppercase">{interview.date === 'Tomorrow' ? 'TMRW' : '28'}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{interview.candidate}</h3>
                <p className="text-slate-500 font-medium">{interview.role}</p>
                <div className="flex items-center gap-4 mt-2 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={16} /> {interview.time}</span>
                  <span className="flex items-center gap-1 text-indigo-500"><Video size={16} /> {interview.platform}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2 mr-4 border-r border-slate-100 pr-4">
                <button onClick={() => handleReschedule(interview.id)} className="text-xs font-bold text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors">
                  <RefreshCw size={12} /> Reschedule
                </button>
                <button onClick={() => handleCancel(interview.id, interview.candidate)} className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors">
                  <XCircle size={12} /> Cancel
                </button>
              </div>

              {/* Feature 3: Post-Interview Results Form Button */}
              <div className="flex flex-col gap-2">
                <button className="bg-slate-900 hover:bg-teal-600 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm">
                  Join Meeting
                </button>
                <button onClick={() => setResultModalOpen(interview.id)} className="bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 px-6 py-2 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2">
                  <ClipboardCheck size={16} /> Log Result
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {resultModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
                <h2 className="text-xl font-bold text-indigo-900">Log Interview Result</h2>
                <button onClick={() => setResultModalOpen(null)} className="text-indigo-400 hover:text-indigo-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleResultSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Final Decision</label>
                  <select required className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="">Select Outcome...</option>
                    <option value="pass">Pass - Extend Offer</option>
                    <option value="fail">Fail - Reject Candidate</option>
                    <option value="hold">Hold - Need more time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Interviewer Notes & Comments</label>
                  <textarea required rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Provide detailed feedback on technical performance..."></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold rounded-xl py-3 mt-4 hover:bg-indigo-700 transition-colors shadow-lg">
                  Save Results
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
