import { trends } from "@/lib/data";

export async function GET() {
  return Response.json({ updatedAt: new Date().toISOString(), trends });
}
