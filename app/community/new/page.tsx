import { redirect } from "next/navigation";
import { CommunityIdeaForm } from "@/components/CommunityIdeaForm";
import { getCurrentUser } from "@/lib/auth-store";

export default async function NewCommunityIdeaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan">Team Up</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Post a project idea</h1>
      <p className="mt-4 text-sm leading-6 text-white/60">Keep it simple: explain the project, the roles you need and how collaborators can contact you.</p>
      <div className="mt-8"><CommunityIdeaForm /></div>
    </main>
  );
}
