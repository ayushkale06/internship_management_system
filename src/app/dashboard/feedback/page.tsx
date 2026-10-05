"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Send, Briefcase } from "lucide-react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Post-Internship Evaluation</h1>
        <p className="text-slate-500 font-medium">Rate your experience. This feedback helps improve future internships.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
            <p className="text-slate-500">Your evaluation has been recorded securely in the system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-bold text-slate-800 mb-4 text-center">Overall Experience Rating</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(0)} onClick={() => setRating(star)} className="p-2 transition-transform hover:scale-110 focus:outline-none">
                    <Star size={48} className={`transition-colors duration-200 ${star <= (hoveredRating || rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-50"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mentorship Quality (1-5)</label>
                <input required type="number" min="1" max="5" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Technical Learning (1-5)</label>
                <input required type="number" min="1" max="5" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="4" />
              </div>
              {/* Feature 3: Company Culture and Work Environment Metrics */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Company Culture (1-5)</label>
                <input required type="number" min="1" max="5" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Work Environment (1-5)</label>
                <input required type="number" min="1" max="5" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="4" />
              </div>
            </div>

            <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
              <label className="block text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Briefcase size={16} /> Likelihood to Hire Full-Time (Return Offer)
              </label>
              <select required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="">Select an option...</option>
                <option value="high">High - Strongly Recommend</option>
                <option value="medium">Medium - Potential Candidate</option>
                <option value="low">Low - Unlikely</option>
                <option value="none">None - Not a Fit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Detailed Comments & Suggestions
              </label>
              <textarea required rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="What did you like about the company culture? What could be improved?"></textarea>
            </div>

            <button type="submit" disabled={rating === 0} className="w-full bg-indigo-600 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Send size={18} /> Submit Evaluation
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
