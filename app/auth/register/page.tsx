import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Create account</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Join AITrending</h1>
      <p className="mt-3 text-sm leading-6 text-white/60">The first registered local account becomes superadmin for development setup.</p>
      <div className="mt-6"><AuthForm mode="register" /></div>
      <p className="mt-4 text-center text-sm text-white/55">Already registered? <Link href="/auth/login" className="text-cyan">Login</Link></p>
    </main>
  );
}
