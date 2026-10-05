"use client";

import { motion } from "framer-motion";
import { Users, FileSignature, Briefcase, Plus, Star, X, Trash2, Download, CheckCircle2, Edit2 } from "lucide-react";
import { useState } from "react";

export default function FacultyDashboard() {
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Feature 1: Edit State
  
  const [evaluations, setEvaluations] = useState([
    { id: 1, name: "Alex Rivera", company: "TechNova Solutions", role: "Frontend Intern", status: "Pending Evaluation" },
    { id: 2, name: "Jordan Smith", company: "HealthPlus AI", role: "Backend Engineer", status: "Evaluated" },
  ]);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEditing ? "Academic record successfully updated." : "Academic evaluation submitted and recorded securely.");
    setEvaluationModalOpen(false);
    setIsEditing(false);
  };

  const handleArchive = (id: number) => {
    if (confirm("Are you sure you want to permanently archive/remove this evaluation?")) {
      setEvaluations(evaluations.filter(e => e.id !== id));
      alert("Evaluation securely archived.");
    }
  };

  const openEditModal = (name: string) => {
    setSelectedStudent(name);
    setIsEditing(true);
    setEvaluationModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Faculty Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage your department's internships and evaluate student performance.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => {
              import('jspdf').then(module => {
                const jsPDF = module.default;
                const doc = new jsPDF();
                doc.setFontSize(22);
                doc.text("Faculty Department Report", 20, 20);
                doc.setFontSize(14);
                doc.text("Generated: " + new Date().toLocaleDateString(), 20, 30);
                doc.text("Total Placed: 145", 20, 50);
                doc.text("Active Postings: 4", 20, 60);
                doc.save("Faculty_Report.pdf");
              });
            }} className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
            <Download size={18} /> Export Report
          </button>
          <button onClick={() => alert("Redirecting to post a new department internship...")} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg active:scale-95">
            <Plus size={18} /> Post Opportunity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl border border-slate-200 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-2 text-indigo-600">
            <Briefcase size={20} /> <span className="font-bold">Active Postings</span>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900">4</h3>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl border border-slate-200 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-2 text-amber-600">
            <FileSignature size={20} /> <span className="font-bold">Pending Evaluations</span>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900">12</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-3xl border border-slate-200 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <Users size={20} /> <span className="font-bold">Students Placed</span>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900">145</h3>
        </motion.div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Student Evaluations</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {evaluations.map((ev, i) => (
            <div key={ev.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h4 className="font-bold text-slate-900">{ev.name}</h4>
                <p className="text-sm font-medium text-slate-500">{ev.role} • {ev.company}</p>
              </div>
              <div className="flex items-center gap-3">
                {ev.status === "Pending Evaluation" ? (
                  <button onClick={() => { setSelectedStudent(ev.name); setIsEditing(false); setEvaluationModalOpen(true); }} className="px-4 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-lg text-sm hover:bg-emerald-100 transition-colors flex items-center gap-2">
                    <Star size={16} /> Evaluate Now
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 bg-slate-100 text-slate-400 font-bold rounded-lg text-sm flex items-center gap-2">
                      <CheckCircle2 size={16} /> Completed
                    </span>
                    {/* Feature 1: Edit Evaluation Button */}
                    <button onClick={() => openEditModal(ev.name)} className="p-2 border border-slate-200 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit Evaluation">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleArchive(ev.id)} className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Archive Evaluation">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {evaluationModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
              <h2 className="text-xl font-bold text-emerald-900">
                {isEditing ? "Edit Academic Evaluation:" : "Academic Evaluation:"} {selectedStudent}
              </h2>
              <button onClick={() => setEvaluationModalOpen(false)} className="text-emerald-400 hover:text-emerald-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleEvaluate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Internship Suitability for Course Objectives</label>
                <textarea required rows={4} defaultValue={isEditing ? "Highly aligned with CS301 requirements." : ""} placeholder="Did this placement align with the academic curriculum requirements?" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Student Learning Outcomes Achieved</label>
                <textarea required rows={4} defaultValue={isEditing ? "Student mastered React and REST APIs." : ""} placeholder="Detail the specific academic and practical skills the student acquired." className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold rounded-xl py-3.5 hover:bg-emerald-700 transition-colors shadow-lg">
                {isEditing ? "Update Academic Record" : "Submit Academic Record"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
