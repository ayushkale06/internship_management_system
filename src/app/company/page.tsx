"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

export default function CompanyDashboard() {
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<number | null>(null);

  const [postings, setPostings] = useState([
    { id: 1, title: "Frontend Engineering Intern", domain: "Software Engineering", status: "Active", applicants: 45, deadline: "2024-11-01" },
    { id: 2, title: "Data Analyst Intern", domain: "Data Science", status: "Active", applicants: 28, deadline: "2024-11-15" }
  ]);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Internship posted successfully!");
    setIsPostingModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Internship details updated successfully!");
    setIsEditModalOpen(null);
  };

  const handleArchive = (id: number) => {
    if (confirm("Are you sure you want to permanently archive/remove this internship opportunity?")) {
      setPostings(postings.filter(p => p.id !== id));
      alert("Internship opportunity securely archived.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, TechNova Solutions</h1>
          <p className="text-slate-500 font-medium">Manage your campus hiring pipeline and track internship analytics.</p>
        </div>
        <button onClick={() => setIsPostingModalOpen(true)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg active:scale-95">
          <Plus size={20} /> Post Internship
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-900">Manage Active Postings</h2></div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="p-4 font-bold">Role & Domain</th>
              <th className="p-4 font-bold">Applicants</th>
              <th className="p-4 font-bold">Deadline</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {postings.map(post => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{post.title}</div>
                  <div className="text-sm text-slate-500">{post.domain}</div>
                </td>
                <td className="p-4 font-medium text-slate-700">{post.applicants}</td>
                <td className="p-4 text-sm text-slate-500">{post.deadline}</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold">{post.status}</span></td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => setIsEditModalOpen(post.id)} className="p-2 text-slate-400 hover:text-indigo-600 border border-slate-200 rounded-lg hover:bg-white transition-colors" title="Edit Opportunity"><Edit2 size={16} /></button>
                  <button onClick={() => handleArchive(post.id)} className="p-2 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-rose-50 transition-colors" title="Archive Opportunity"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isPostingModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            {/* Modal Content omitted for brevity, identical to previous */}
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6">
               <h2 className="text-xl font-bold mb-4">Post Internship Mockup</h2>
               <button onClick={() => setIsPostingModalOpen(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
        {isEditModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6">
               <h2 className="text-xl font-bold mb-4">Edit Internship Mockup</h2>
               <button onClick={() => setIsEditModalOpen(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
