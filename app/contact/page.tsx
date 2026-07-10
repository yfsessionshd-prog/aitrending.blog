export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-5xl font-bold">Contact</h1>
      <form className="mt-8 space-y-4 rounded-xl border border-white/5 bg-card p-5">
        <input required placeholder="Name" className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-cyan" />
        <input required type="email" placeholder="Email" className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-cyan" />
        <textarea required placeholder="Message" rows={6} className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-cyan" />
        <button className="rounded-lg bg-cyan px-5 py-3 font-bold text-ink">Send message</button>
      </form>
    </main>
  );
}
