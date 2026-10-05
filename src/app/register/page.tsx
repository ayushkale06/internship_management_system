"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, UserPlus, Lock, Building } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    name: "", email: "", phone: "", password: "", role: "student", gpa: "",
    regNumber: "", location: "", contactPerson: "" // Feature 1: Company Fields
  });
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Must be a valid email format.";

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Must be 10-15 digits. '+' allowed at start.";

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passRegex.test(formData.password)) {
      newErrors.password = "Minimum 8 characters, requiring at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }

    if (formData.role === 'student') {
      const gpaNum = parseFloat(formData.gpa);
      if (isNaN(gpaNum) || gpaNum < 0.0 || gpaNum > 4.0) {
        newErrors.gpa = "GPA must be a decimal value between 0.0 and 4.0.";
      }
    }
    
    // Validate strict company requirement
    if (formData.role === 'company') {
      if (!formData.regNumber || formData.regNumber.length < 5) newErrors.regNumber = "Valid Registration Number required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setSuccess(true);
        } else {
          const data = await res.json();
          setErrors({ email: data.error || "Email may already exist." });
        }
      } catch (err) {
        setErrors({ email: "Network error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white max-w-xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden mt-10">
        <div className="p-8 border-b border-slate-100 text-center bg-indigo-900 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 blur-[80px] rounded-full pointer-events-none" />
          <UserPlus size={40} className="mx-auto mb-4 text-indigo-400" />
          <h1 className="text-3xl font-extrabold mb-2 relative z-10">Create Account</h1>
          <p className="text-indigo-200 relative z-10">Strict validation enforced for platform security.</p>
        </div>

        {success ? (
          <div className="p-12 text-center">
            <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful</h2>
            <p className="text-slate-500 mb-8">Your account has passed all security checks and is ready.</p>
            <Link href="/" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name / Company Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Account Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="student">Student</option>
                  <option value="company">Company</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
            </div>

            {formData.role === 'student' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Cumulative GPA (0.0 - 4.0)</label>
                <input required type="number" step="0.1" value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none ${errors.gpa ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`} placeholder="3.8" />
                {errors.gpa && <p className="text-rose-600 text-xs font-bold mt-2 flex items-center gap-1"><ShieldAlert size={14}/> {errors.gpa}</p>}
              </div>
            )}

            {/* Feature 1: Dynamic Company Fields */}
            {formData.role === 'company' && (
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-2"><Building size={16} className="text-slate-500"/><h3 className="font-bold text-slate-800 text-sm">Company Details</h3></div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Official Registration Number</label>
                  <input required type="text" value={formData.regNumber} onChange={e => setFormData({...formData, regNumber: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm ${errors.regNumber ? 'border-rose-500' : 'border-slate-200'}`} placeholder="e.g. 123456789" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Headquarters Location</label>
                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="San Francisco, CA" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Contact Person</label>
                    <input required type="text" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="Jane Doe" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`} />
              {errors.email && <p className="text-rose-600 text-xs font-bold mt-2 flex items-center gap-1"><ShieldAlert size={14}/> {errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number (International)</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`} placeholder="+1234567890" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Lock size={16}/> Secure Password</label>
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none ${errors.password ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`} />
              {errors.password && <p className="text-rose-600 text-xs font-bold mt-2 leading-relaxed flex items-start gap-1"><ShieldAlert size={14} className="shrink-0 mt-0.5"/> {errors.password}</p>}
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-bold rounded-xl py-4 mt-4 hover:bg-indigo-600 transition-colors shadow-xl active:scale-95">
              Securely Register
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
