import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Welcome back</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Login to AITrending</h1>
      <p className="mt-3 text-sm leading-6 text-white/60">Access your profile, bookmarks and editorial dashboard if your role allows it.</p>
      <div className="mt-6"><AuthForm mode="login" /></div>
      <p className="mt-4 text-center text-sm text-white/55">No account? <Link href="/auth/register" className="text-cyan">Create one</Link></p>
    </main>
  );
}
