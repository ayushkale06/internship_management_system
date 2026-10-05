"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2, UserCheck } from "lucide-react";

export default function CompanyStudentEvaluation() {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    technical: 0, soft: 0, punctuality: 0, responsibility: 0, teamwork: 0, learning: 0
  });

  const traits = [
    { key: "technical", label: "Technical Skills", desc: "Proficiency in required tools, languages, and frameworks." },
    { key: "soft", label: "Soft Skills", desc: "Communication, adaptability, and emotional intelligence." },
    { key: "punctuality", label: "Punctuality", desc: "Timeliness for meetings, deadlines, and daily schedule." },
    { key: "responsibility", label: "Responsibility", desc: "Ownership of tasks and accountability for outcomes." },
    { key: "teamwork", label: "Teamwork", desc: "Collaboration and ability to work effectively with others." },
    { key: "learning", label: "Learning Ability", desc: "Speed of grasping new concepts and applying feedback." }
  ];

  const setRating = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Student Performance Evaluation</h1>
        <p className="text-slate-500 font-medium">Evaluate your intern's performance across 6 key metrics. This feedback goes to the university.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Evaluation Recorded</h2>
            <p className="text-slate-500">Thank you for your detailed feedback on this candidate.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600"><UserCheck size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-900">Evaluating: Alex Rivera</h3>
                <p className="text-sm text-slate-500">Frontend Engineering Intern • Summer 2024</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {traits.map((trait) => (
                <div key={trait.key}>
                  <label className="block text-sm font-bold text-slate-700 mb-1">{trait.label}</label>
                  <p className="text-xs text-slate-400 mb-2 h-8">{trait.desc}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(trait.key, star)}
                        className="focus:outline-none"
                      >
                        <Star size={28} className={`transition-colors ${(ratings as any)[trait.key] >= star ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-50"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-700 mb-2">Open Comments & Areas for Improvement</label>
              <textarea required rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Provide detailed feedback on their strengths and weaknesses..."></textarea>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
              <Send size={18} /> Submit Official Evaluation
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
