"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Lightbulb, Send, CheckCircle2 } from "lucide-react";

export default function SystemSupport() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">System Feedback & Bug Reports</h1>
        <p className="text-slate-500 font-medium">Help us improve. Submit feature requests or report technical issues directly to system administrators.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-12">
            <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Feedback Received</h2>
            <p className="text-slate-500 max-w-md mx-auto">Your report has been securely transmitted to the Admin dashboard for review. Action items will be tracked!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Feedback Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-colors">
                  <input type="radio" name="type" value="bug" className="hidden" />
                  <Bug className="text-rose-500" size={24} />
                  <span className="font-bold text-slate-800">Report a Bug</span>
                </label>
                <label className="flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-colors">
                  <input type="radio" name="type" value="feature" className="hidden" />
                  <Lightbulb className="text-amber-500" size={24} />
                  <span className="font-bold text-slate-800">Feature Suggestion</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Summary Title</label>
              <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Cannot upload resume on mobile" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Description</label>
              <textarea required rows={5} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Please provide specific steps to reproduce the bug, or explain your feature idea in detail..."></textarea>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors shadow-lg active:scale-95">
                <Send size={18} /> Submit to Admins
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
