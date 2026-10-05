"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, CheckCircle2, X, Clock3, Calendar } from "lucide-react";

export default function ReviewApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  // 24-hour validation helper
  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
    return tomorrow.toISOString().slice(0, 16);
  };

  const fetchApplications = () => {
    fetch('/api/applications?role=company')
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    if (newStatus === 'Accepted') {
      setSelectedApp(id);
      setScheduleModalOpen(true);
      return;
    }
    
    await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    fetchApplications();
  };

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedApp) return;
    
    // Feature 4: 24-Hour Interview Notice Validation
    const formData = new FormData(e.currentTarget);
    const selectedTime = new Date(formData.get('interviewDate') as string).getTime();
    if (selectedTime < Date.now() + 24 * 60 * 60 * 1000) {
      alert("Validation Error: Interviews must be scheduled with at least 24 hours notice.");
      return;
    }
    
    await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedApp, status: 'Accepted' })
    });
    
    alert("Interview Scheduled successfully!");
    setScheduleModalOpen(false);
    setSelectedApp(null);
    fetchApplications();
  };

  const columns = [
    { title: "Pending Review", statusMatch: "Pending Review", color: "border-blue-200 bg-blue-50/50" },
    { title: "Shortlisted", statusMatch: "Shortlisted", color: "border-amber-200 bg-amber-50/50" },
    { title: "Accepted / Interviewing", statusMatch: "Accepted", color: "border-teal-200 bg-teal-50/50" }
  ];

  return (
    <div className="max-w-7xl mx-auto h-[80vh] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Live Application Board</h1>
        <p className="text-slate-500 font-medium">Watch this board update in real-time as students apply from their dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {columns.map((col, i) => {
          const colApps = applications.filter(a => a.status === col.statusMatch);
          return (
            <motion.div key={i} className={`rounded-3xl border ${col.color} p-4 flex flex-col`}>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-slate-800">{col.title}</h3>
                <span className="bg-white text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm">{colApps.length}</span>
              </div>
              
              <div className="flex-1 space-y-4">
                {colApps.length === 0 && <p className="text-slate-400 text-sm text-center mt-10">No candidates yet.</p>}
                
                {colApps.map((app, j) => (
                  <motion.div layout key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-bold text-slate-900">{app.student.name}</div>
                      <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">New!</div>
                    </div>
                    <div className="text-sm font-medium text-slate-500 mb-4">{app.internship.title}</div>
                    
                    <div className="flex gap-2">
                      {app.status === 'Pending Review' && (
                        <>
                          <button onClick={() => updateStatus(app.id, 'Shortlisted')} className="flex-1 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg text-xs font-bold transition-colors">Shortlist</button>
                          <button onClick={() => updateStatus(app.id, 'Rejected')} className="flex-1 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors">Reject</button>
                        </>
                      )}
                      {app.status === 'Shortlisted' && (
                        <button onClick={() => updateStatus(app.id, 'Accepted')} className="w-full py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors">Schedule Interview</button>
                      )}
                      {app.status === 'Accepted' && (
                        <div className="w-full py-1.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg text-xs font-bold text-center">Interview Scheduled</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {scheduleModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={20}/> Schedule Interview</h2>
                <button onClick={() => setScheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleScheduleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Interview Date & Time (Min 24h notice)</label>
                  <input name="interviewDate" min={getMinDateTime()} required type="datetime-local" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Platform / Location</label>
                  <select name="platform" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none">
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>Microsoft Teams</option>
                    <option>On-Site (Office)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Interviewer Details</label>
                  <input name="interviewer" required type="text" placeholder="e.g. John Doe, Tech Lead" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-teal-600 text-white font-bold rounded-xl py-3 mt-2 hover:bg-teal-700 transition-colors">
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
