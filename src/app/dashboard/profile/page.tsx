"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, UserCircle, UploadCloud, AlertTriangle, FileText } from "lucide-react";

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    name: "Alex Rivera",
    email: "alex@nexus.com",
    phone: "+19876543210",
    department: "Computer Science",
    gpa: "3.8",
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Validation Error: Resume must be in PDF format only.");
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Validation Error: Resume file size must not exceed 5MB.");
        e.target.value = '';
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile details and resume updated successfully!");
  };

  const handleDeactivate = () => {
    if (confirm("DANGER: Are you sure you want to deactivate your student account? This action will hide your profile from all companies and withdraw pending applications.")) {
      alert("Account deactivated successfully. Redirecting to login...");
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Profile</h1>
        <p className="text-slate-500 font-medium">Update your contact details, academic records, and resume.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="h-24 w-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <UserCircle size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{formData.name}</h2>
            <p className="text-slate-500">{formData.department}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
              <input required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Cumulative GPA</label>
              <input required type="number" step="0.1" value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><FileText size={18}/> Update Resume (PDF Only, Max 5MB)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl hover:bg-slate-50 hover:border-indigo-400 transition-colors cursor-pointer">
                <UploadCloud size={32} className="text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-600">Click to upload new resume</span>
                <span className="text-xs text-slate-400 mt-1">PDF up to 5MB</span>
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </label>
              {resumeFile && (
                <div className="flex-1 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3 text-indigo-700 font-medium text-sm">
                  <FileText size={24} className="text-indigo-500" />
                  <div className="truncate">
                    <span className="font-bold block truncate">{resumeFile.name}</span>
                    <span className="text-xs opacity-70">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg active:scale-95">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </motion.div>

      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-rose-900 mb-1 flex items-center gap-2"><AlertTriangle size={20}/> Danger Zone</h3>
          <p className="text-sm font-medium text-rose-700">Deactivating your account will withdraw all active applications.</p>
        </div>
        <button onClick={handleDeactivate} className="px-6 py-3 bg-white border border-rose-200 text-rose-600 font-bold rounded-xl hover:bg-rose-600 hover:text-white transition-colors shadow-sm">
          Deactivate Account
        </button>
      </div>
    </div>
  );
}
