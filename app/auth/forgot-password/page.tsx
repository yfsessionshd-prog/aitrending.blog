import { AuthForm } from "@/components/AuthForm";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Recovery</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Recover password</h1>
      <p className="mt-3 text-sm leading-6 text-white/60">In local mode this prepares the recovery flow. Email delivery is activated with the production email provider.</p>
      <div className="mt-6"><AuthForm mode="forgot" /></div>
    </main>
  );
}
