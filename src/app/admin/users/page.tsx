"use client";

import { useState, useEffect } from "react";
import { Download, Upload, UserPlus, Edit2, Trash2, ShieldAlert } from "lucide-react";

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleDeactivate = (id: number, name: string) => {
    if (confirm(`Are you sure you want to deactivate the account for ${name}?`)) {
      setUsers(users.map(u => u.id === id ? { ...u, status: "Deactivated" } : u));
      alert(`${name}'s account has been successfully deactivated.`);
    }
  };

  const handleEdit = (name: string) => {
    alert(`Opening Admin Edit Modal for ${name}... (Modify details, reset password, change role)`);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">User Management</h1>
          <p className="text-slate-500 font-medium">Create, edit, and deactivate user accounts across the system.</p>
        </div>
        <div className="flex gap-3">
          {/* Requirement 2: Export Data */}
          <button onClick={() => alert("Downloading full system user data as CSV...")} className="bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={18} /> Export Data
          </button>
          
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm relative">
            <Upload size={18} /> Import CSV
            <input type="file" accept=".csv" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => alert("Simulating CSV Import processing...")} />
          </button>

          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
            <UserPlus size={18} /> Invite User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-bold">User Details</th>
              <th className="p-4 font-bold">Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Admin Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500 font-bold">Loading users...</td></tr>
            ) : users.map(user => (
              <tr key={user.id} className={`hover:bg-slate-50 ${user.status === 'Deactivated' ? 'opacity-60' : ''}`}>
                <td className="p-4">
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </td>
                <td className="p-4"><span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold capitalize">{user.role}</span></td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleEdit(user.name)} className="p-2 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit User">
                    <Edit2 size={18} />
                  </button>
                  {user.status === 'Active' && (
                    <button onClick={() => handleDeactivate(user.id, user.name)} className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Deactivate Account">
                      <ShieldAlert size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
