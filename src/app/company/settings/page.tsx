"use client";

import { motion } from "framer-motion";
import { Building2, Save, Mail, MapPin } from "lucide-react";

export default function CompanySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Company Settings</h1>
        <p className="text-slate-500 font-medium">Manage your organizational profile and preferences.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="h-24 w-24 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
            <Building2 size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Company Logo</h3>
            <p className="text-sm text-slate-500 mb-3">Upload a square image (max 2MB).</p>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition-colors">Upload Image</button>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
              <input type="text" defaultValue="TechNova Solutions" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Registration Number</label>
              <input type="text" defaultValue="REG-12345" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><MapPin size={16}/> Headquarters Location</label>
            <input type="text" defaultValue="San Francisco, CA" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Mail size={16}/> Primary Contact Email</label>
            <input type="email" defaultValue="hr@technova.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="button" onClick={() => alert("Settings saved!")} className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/20 active:scale-95">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
