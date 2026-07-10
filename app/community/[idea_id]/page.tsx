import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-store";
import { getComments, getIdea, getIdeas } from "@/lib/community-store";
import { CommunityThread } from "@/components/CommunityThread";

export function generateStaticParams() {
  return getIdeas().map((idea) => ({ idea_id: idea.id }));
}

export default async function CommunityIdeaPage({ params }: { params: Promise<{ idea_id: string }> }) {
  const { idea_id } = await params;
  const idea = getIdea(idea_id);
  if (!idea) notFound();
  const user = await getCurrentUser();
  return <CommunityThread idea={idea} comments={getComments(idea.id)} canEdit={user?.id === idea.authorId} />;
}
