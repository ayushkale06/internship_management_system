"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/student";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
        setLoading(false);
      } else {
        // Fetch session to determine role for routing
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const role = sessionData?.user?.role || "student";
        
        let destination = callbackUrl;
        if (!searchParams.get("callbackUrl")) {
          if (role === "admin") destination = "/admin";
          else if (role === "faculty") destination = "/faculty";
          else if (role === "company") destination = "/company";
          else destination = "/dashboard/student";
        }

        router.push(destination);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 text-center bg-indigo-900 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
          <ShieldCheck size={48} className="mx-auto mb-4 text-indigo-400 relative z-10" />
          <h1 className="text-3xl font-extrabold mb-2 relative z-10">Welcome Back</h1>
          <p className="text-indigo-200 relative z-10">Sign in to access your portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl text-sm font-medium text-center">
            Since this is a fresh database, please click <strong>Register here</strong> below to create a new user account if you haven't yet!
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 border border-rose-100">
              <AlertCircle size={18}/> {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Mail size={16}/> Email Address</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="you@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Lock size={16}/> Password</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold rounded-xl py-4 hover:bg-indigo-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg active:scale-95">
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
          
          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">Don't have an account? <br/><br/><Link href="/register" className="inline-block px-6 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg font-bold hover:bg-indigo-100 transition-colors">Register here</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Secure Portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
