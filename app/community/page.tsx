import { CommunityBoard } from "@/components/CommunityBoard";
import { getComments, getIdeas } from "@/lib/community-store";

export default function CommunityPage() {
  const ideas = getIdeas().map((idea) => ({ ...idea, commentsCount: getComments(idea.id).length }));
  return <CommunityBoard ideas={ideas} />;
}
