"use client";

import { motion } from "framer-motion";
import { Download, TrendingUp, Users, Building, FileText, Trophy, Star } from "lucide-react";

export default function ComplianceReports() {
  const topStudents = [
    { name: "Alex Rivera", department: "Computer Science", gpa: 3.9, applications: 4, offers: 3 },
    { name: "Jordan Smith", department: "Data Science", gpa: 3.8, applications: 5, offers: 2 },
    { name: "Emily Chen", department: "UI/UX Design", gpa: 4.0, applications: 2, offers: 2 },
  ];

  const popularInternships = [
    { title: "Frontend Engineering Intern", company: "TechNova Solutions", applicants: 145, rating: 4.9 },
    { title: "Data Analyst Intern", company: "Global Fin", applicants: 98, rating: 4.7 },
    { title: "Product Management Intern", company: "Nexus Design", applicants: 86, rating: 4.8 },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Compliance & Reports</h1>
          <p className="text-slate-500 font-medium">Generate and download system-wide analytics and audit logs.</p>
        </div>
        <button className="bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-700 transition-colors shadow-lg active:scale-95">
          <FileText size={18} /> Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <TrendingUp size={24} />
            <h3 className="font-bold text-slate-800 text-lg">Placement Rate</h3>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 mb-2">84.2%</div>
          <p className="text-sm font-medium text-slate-500">+2.4% from last semester</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Users size={24} />
            <h3 className="font-bold text-slate-800 text-lg">Total Placed</h3>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 mb-2">1,240</div>
          <p className="text-sm font-medium text-slate-500">Students matched this year</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <Building size={24} />
            <h3 className="font-bold text-slate-800 text-lg">Active Partners</h3>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 mb-2">42</div>
          <p className="text-sm font-medium text-slate-500">Companies hiring currently</p>
        </motion.div>
      </div>

      {/* Feature 5: Specific Admin Report Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <Trophy className="text-amber-500" size={24} />
            <h2 className="text-xl font-bold text-slate-900">Top Performing Students</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">Student Name</th>
                <th className="p-4 font-bold">GPA</th>
                <th className="p-4 font-bold text-right">Offers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topStudents.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.department}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{s.gpa.toFixed(1)}</td>
                  <td className="p-4 text-right">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold">{s.offers}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <Star className="text-indigo-500" size={24} />
            <h2 className="text-xl font-bold text-slate-900">Most Popular Internships</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">Role & Company</th>
                <th className="p-4 font-bold">Applicants</th>
                <th className="p-4 font-bold text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {popularInternships.map((job, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{job.title}</div>
                    <div className="text-xs text-slate-500">{job.company}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{job.applicants}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 font-bold text-amber-500">
                      {job.rating} <Star size={14} className="fill-amber-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
