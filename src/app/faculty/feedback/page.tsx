"use client";

import { useState } from "react";
import { MessageSquare, Reply, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FacultyStudentFeedback() {
  const [feedback, setFeedback] = useState([
    { id: 1, student: "Alex Rivera", company: "TechNova Solutions", rating: 4, comment: "Great mentorship, but the work environment was a bit stressful during deadlines.", responded: false },
    { id: 2, student: "Jordan Smith", company: "Global Fin", rating: 5, comment: "Excellent technical learning opportunities. Loved the culture.", responded: true }
  ]);
  const [replyText, setReplyText] = useState("");
  const [activeReply, setActiveReply] = useState<number | null>(null);

  const handleRespond = (id: number) => {
    if (!replyText) return;
    setFeedback(feedback.map(f => f.id === id ? { ...f, responded: true } : f));
    setActiveReply(null);
    setReplyText("");
    alert("Faculty response securely recorded and sent to student.");
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Student Feedback Review</h1>
        <p className="text-slate-500 font-medium">Review and respond to post-internship feedback submitted by students.</p>
      </div>

      <div className="space-y-6">
        {feedback.map(fb => (
          <motion.div key={fb.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{fb.student}</h3>
                <p className="text-sm font-medium text-slate-500">Interned at: {fb.company}</p>
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-700 font-bold rounded-lg text-sm flex items-center gap-1">
                {fb.rating} / 5 Stars
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 italic mb-4">
              "{fb.comment}"
            </div>

            {fb.responded ? (
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 size={18} /> Official Faculty Response Submitted
              </div>
            ) : activeReply === fb.id ? (
              <div className="space-y-3">
                <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={3} placeholder="Write your official response to the student's feedback..." className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setActiveReply(null)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                  <button onClick={() => handleRespond(fb.id)} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2"><Reply size={16}/> Submit Response</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setActiveReply(fb.id)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <MessageSquare size={16} /> Respond to Feedback
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
