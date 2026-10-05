"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock3, Building, Trash2, FileSignature, X, PartyPopper } from "lucide-react";

export default function StudentApplications() {
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [applications, setApplications] = useState([
    { id: 1, company: "TechNova Solutions", role: "Frontend Developer", status: "Interviewing", date: "Oct 12, 2024", icon: Clock3, statusColor: "text-amber-700 bg-amber-100 border-amber-200" },
    { id: 2, company: "Global Fin", role: "Data Analyst", status: "Accepted", date: "Oct 10, 2024", icon: CheckCircle2, statusColor: "text-emerald-700 bg-emerald-100 border-emerald-200" },
    { id: 3, company: "Nexus Design", role: "UI/UX Intern", status: "Pending", date: "Oct 08, 2024", icon: Clock3, statusColor: "text-blue-700 bg-blue-100 border-blue-200" },
  ]);

  const handleWithdraw = (id: number, company: string) => {
    if (confirm(`Are you sure you want to withdraw your application from ${company}? This cannot be undone.`)) {
      setApplications(applications.filter(app => app.id !== id));
      alert(`Application to ${company} successfully withdrawn.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Applications</h1>
        <p className="text-slate-500 font-medium">View the history and current status of all your internship applications.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {applications.map((app) => (
            <div key={app.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Building className="text-slate-400" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{app.role}</h4>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mt-1">
                    <span className="text-indigo-600 font-bold">{app.company}</span>
                    <span>•</span>
                    <span>Applied {app.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border shadow-sm ${app.statusColor}`}>
                  <app.icon size={16} strokeWidth={3} />
                  {app.status}
                </div>
                
                {/* Feature 4: View Offer Details Button */}
                {app.status === 'Accepted' && (
                  <button onClick={() => setOfferModalOpen(true)} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-md">
                    <FileSignature size={16} /> View Offer
                  </button>
                )}

                {(app.status === 'Pending' || app.status === 'Interviewing') && (
                  <button onClick={() => handleWithdraw(app.id, app.company)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200" title="Withdraw Application">
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {offerModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
                <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2"><PartyPopper size={20}/> Official Offer Details</h2>
                <button onClick={() => setOfferModalOpen(false)} className="text-emerald-400 hover:text-emerald-600"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold text-slate-900">Global Fin</h3>
                  <p className="text-slate-500 font-medium">Data Analyst Intern</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-slate-500 font-bold">Monthly Stipend</span>
                    <span className="text-xl font-extrabold text-emerald-600">$3,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-slate-500 font-bold">Start Date</span>
                    <span className="font-bold text-slate-900">June 1, 2024</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-slate-500 font-bold">Duration</span>
                    <span className="font-bold text-slate-900">12 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold">Location</span>
                    <span className="font-bold text-slate-900">New York, NY (Hybrid)</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => { alert("Offer Accepted! Company notified."); setOfferModalOpen(false); }} className="flex-1 bg-emerald-600 text-white font-bold rounded-xl py-3.5 hover:bg-emerald-700 transition-colors shadow-lg">
                    Accept Offer
                  </button>
                  <button onClick={() => { alert("Offer Declined."); setOfferModalOpen(false); }} className="flex-1 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl py-3.5 hover:bg-slate-50 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
