"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Building, Briefcase, Filter, X, FileText, Award, CheckCircle2 } from "lucide-react";

export default function InternshipBoard() {
  const [applyModalOpen, setApplyModalOpen] = useState<number | null>(null);
  
  const internships = [
    { id: 1, title: "Frontend Developer", company: "TechNova Solutions", location: "San Francisco, CA", type: "Hybrid", stipend: "$4,000/mo", tags: ["React", "TypeScript", "UI/UX"] },
    { id: 2, title: "Data Analyst", company: "Global Fin", location: "New York, NY", type: "On-site", stipend: "$3,500/mo", tags: ["Python", "SQL", "Tableau"] },
    { id: 3, title: "Backend Engineer", company: "CloudScale", location: "Remote", type: "Remote", stipend: "$4,500/mo", tags: ["Node.js", "AWS", "PostgreSQL"] },
  ];

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, we capture the coverLetter and qualifications from the FormData
    alert("Application successfully submitted with Resume, Cover Letter, and Qualifications!");
    setApplyModalOpen(null);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Explore Internships</h1>
        <p className="text-slate-500 font-medium">Find your next big opportunity. Filter by domain, company, and location.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="Search by role, company, or keywords..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium" />
        </div>
        <button className="px-6 py-3.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {internships.map((job) => (
          <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-6">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                <Building className="text-indigo-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mb-4">
                  <span className="flex items-center gap-1 text-slate-700"><Briefcase size={16} /> {job.company}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-bold">{job.type}</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-bold">{job.stipend}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setApplyModalOpen(job.id)} className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg active:scale-95 shrink-0">
              Apply Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Feature 1: Cover Letter & Qualifications Modal */}
      <AnimatePresence>
        {applyModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800">Submit Application</h2>
                <button onClick={() => setApplyModalOpen(null)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              <form onSubmit={submitApplication} className="p-6 space-y-5">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4">
                  <p className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Your active resume (PDF) will be attached automatically.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Award size={16} /> Key Qualifications</label>
                  <input required name="qualifications" type="text" placeholder="e.g. React, 3.8 GPA, AWS Certified" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Briefly list your top skills relevant to this role.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><FileText size={16} /> Cover Letter</label>
                  <textarea required name="coverLetter" rows={5} placeholder="Why are you the perfect fit for this company?" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold rounded-xl py-3.5 hover:bg-indigo-700 transition-colors shadow-lg">
                  Confirm Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
