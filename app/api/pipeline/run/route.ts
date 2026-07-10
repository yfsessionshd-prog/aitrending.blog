import { runContentPipeline } from "@/lib/automation";

export async function POST() {
  try {
    return Response.json(await runContentPipeline());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown pipeline error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return Response.json(await runContentPipeline());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown pipeline error";
    return Response.json({ error: message }, { status: 500 });
  }
}
