"use client";
import { AlertTriangle, Download, XCircle, CheckCircle, Bug, Lightbulb, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [pendingInternships, setPendingInternships] = useState([
    { id: 1, company: "Nexus Design", title: "Product Marketing Intern", date: "Oct 20, 2024" },
  ]);

  const [systemFeedback, setSystemFeedback] = useState([
    { id: 101, type: "bug", user: "Alex Rivera", desc: "Mobile view for application timeline is overlapping text.", status: "Open" },
    { id: 102, type: "feature", user: "TechNova HR", desc: "Requesting ability to download resumes in bulk ZIP.", status: "Tracked" },
  ]);

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setPendingInternships(pendingInternships.filter(i => i.id !== id));
    alert(`Internship ${action}d successfully. Company notified.`);
  };

  const handleActionItem = (id: number) => {
    setSystemFeedback(systemFeedback.map(fb => fb.id === id ? { ...fb, status: "Implemented" } : fb));
    alert("Action item marked as implemented!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">System Overview</h1>
        <p className="text-slate-500 font-medium">Master dashboard for system health, reports, and user management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Total Users</h3>
          <p className="text-4xl font-extrabold text-blue-600 mb-1">3,402</p>
          <p className="text-xs font-bold text-slate-400">+124 this week</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Placement Rate</h3>
          <p className="text-4xl font-extrabold text-emerald-500 mb-1">84.2%</p>
          <p className="text-xs font-bold text-slate-400">Computer Science Dept</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Active Internships</h3>
          <p className="text-4xl font-extrabold text-indigo-500 mb-1">156</p>
          <p className="text-xs font-bold text-slate-400">Across 42 companies</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-500 mb-2">System Feedback</h3>
          <p className="text-4xl font-extrabold text-amber-500 mb-1">14</p>
          <p className="text-xs font-bold text-slate-400">Action items pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <div className="bg-white rounded-3xl border border-rose-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-rose-100 bg-rose-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-rose-900">Pending Approvals</h2>
            <span className="bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">{pendingInternships.length} Action Req</span>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white text-slate-400 text-xs uppercase">
                <tr>
                  <th className="p-4 font-bold">Company & Role</th>
                  <th className="p-4 font-bold text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingInternships.map(internship => (
                  <tr key={internship.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-700">{internship.company}</div>
                      <div className="text-xs text-slate-500">{internship.title}</div>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => handleApproval(internship.id, 'approve')} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"><CheckCircle size={14}/> Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Feedback & Bug Tracker */}
        <div className="bg-white rounded-3xl border border-indigo-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-indigo-100 bg-indigo-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2"><MessageSquare size={20}/> System Feedback Tracker</h2>
            <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">{systemFeedback.filter(f=>f.status !== 'Implemented').length} Pending</span>
          </div>
          <div className="flex-1 p-4 space-y-3 bg-slate-50">
            {systemFeedback.map(fb => (
              <div key={fb.id} className={`p-4 bg-white border rounded-xl shadow-sm ${fb.status === 'Implemented' ? 'border-emerald-200 opacity-60' : 'border-slate-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {fb.type === 'bug' ? <Bug size={16} className="text-rose-500"/> : <Lightbulb size={16} className="text-amber-500"/>}
                    <span className="font-bold text-slate-900 text-sm">{fb.user}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${fb.status === 'Implemented' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{fb.status}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{fb.desc}</p>
                {fb.status !== 'Implemented' && (
                  <button onClick={() => handleActionItem(fb.id)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                    Mark as Implemented
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}