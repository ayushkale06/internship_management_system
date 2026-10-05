"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, MapPin, Building, ArrowRight, Check } from "lucide-react";

export default function StudentDashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const } } };

  // Feature 3: Application Timeline Tracker Data
  const applications = [
    { 
      company: "TechNova Solutions", role: "Frontend Developer", 
      timeline: [
        { status: "Applied", date: "Oct 12", completed: true },
        { status: "Resume Reviewed", date: "Oct 15", completed: true },
        { status: "Interviewing", date: "Oct 18", completed: true, active: true },
        { status: "Offer", date: "Pending", completed: false }
      ]
    },
    { 
      company: "Nexus Design", role: "UI/UX Intern", 
      timeline: [
        { status: "Applied", date: "Oct 20", completed: true },
        { status: "Resume Reviewed", date: "Pending", completed: false, active: true },
        { status: "Interviewing", date: "Pending", completed: false },
        { status: "Offer", date: "Pending", completed: false }
      ]
    }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto">
      <motion.div variants={item} className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Your Application Tracker</h1>
        <p className="text-slate-500 font-medium">Track exactly where you stand in the hiring pipeline in real-time.</p>
      </motion.div>

      {/* Feature 3: Visual Timeline Tracker */}
      <div className="space-y-8">
        {applications.map((app, idx) => (
          <motion.div key={idx} variants={item} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                <Building className="text-indigo-500" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{app.role}</h3>
                <p className="text-slate-500 font-medium">{app.company}</p>
              </div>
            </div>

            {/* Stepper UI */}
            <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto pt-4">
              {/* Connecting Line */}
              <div className="absolute left-0 top-7 w-full h-1 bg-slate-100 -z-10 rounded-full" />
              
              {app.timeline.map((step, i) => (
                <div key={i} className="flex flex-col items-center relative z-10 w-24">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-colors ${
                    step.completed ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : 
                    step.active ? "bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg" : 
                    "bg-slate-100 text-slate-400 border-2 border-slate-200"
                  }`}>
                    {step.completed ? <Check size={16} strokeWidth={3} /> : (i + 1)}
                  </div>
                  <div className={`text-sm font-bold text-center leading-tight ${step.active || step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.status}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${step.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {step.date}
                  </div>
                </div>
              ))}
            </div>
            
            {app.timeline.find(s => s.active && s.status === 'Interviewing') && (
              <div className="mt-10 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-indigo-900 mb-1">Action Required: Schedule Technical Interview</h4>
                  <p className="text-sm text-indigo-700">The team wants to meet you! Please pick a time slot.</p>
                </div>
                <button onClick={() => alert("Redirecting to calendar scheduling portal...")} className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-colors">
                  Pick a Time
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
