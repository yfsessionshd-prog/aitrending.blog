import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileEditor } from "@/components/ProfileEditor";
import { getCurrentUser, getProfile } from "@/lib/auth-store";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const profile = getProfile(user.id);
  if (!profile) redirect("/auth/login");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Profile</p>
          <h1 className="mt-3 font-display text-5xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-sm text-white/55">{user.email} · {user.role}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/bookmarks" className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/65">Bookmarks</Link>
          <form action="/api/auth/logout" method="post"><button className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/65">Logout</button></form>
        </div>
      </div>
      <div className="mt-8"><ProfileEditor profile={profile} /></div>
      <section className="mt-8 rounded-xl border border-white/5 bg-card p-5">
        <h2 className="font-display text-2xl font-bold">Reading history</h2>
        <p className="mt-2 text-sm text-white/55">{profile.readingHistory.length ? profile.readingHistory.join(", ") : "No reading history yet."}</p>
      </section>
    </main>
  );
}
