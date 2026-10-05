"use client";

import { motion } from "framer-motion";
import { Briefcase, Edit, Trash2, Eye, Plus, Search } from "lucide-react";

export default function ManagePostings() {
  const postings = [
    { id: 1, title: "Frontend Developer Intern", type: "Hybrid", applicants: 45, status: "Active", posted: "Oct 12, 2024" },
    { id: 2, title: "UI/UX Designer", type: "Remote", applicants: 32, status: "Active", posted: "Oct 10, 2024" },
    { id: 3, title: "Backend Engineer", type: "Remote", applicants: 51, status: "Closed", posted: "Sep 28, 2024" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Manage Postings</h1>
          <p className="text-slate-500 font-medium">View, edit, or remove your active internship opportunities.</p>
        </div>
        <button className="bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-700 transition-colors shadow-lg active:scale-95">
          <Plus size={18} /> New Posting
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search postings..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
              <th className="p-4 font-bold">Role Title</th>
              <th className="p-4 font-bold">Type</th>
              <th className="p-4 font-bold">Applicants</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Posted Date</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {postings.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{job.title}</td>
                <td className="p-4"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{job.type}</span></td>
                <td className="p-4 font-bold text-teal-600">{job.applicants}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-sm font-medium text-slate-500">{job.posted}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-200 transition-colors"><Eye size={16} /></button>
                  <button className="p-2 text-slate-400 hover:text-amber-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-amber-200 transition-colors"><Edit size={16} /></button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-rose-200 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
