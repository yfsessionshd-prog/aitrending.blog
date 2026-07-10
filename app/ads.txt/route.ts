export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-6334111208159981";
  const publisher = client.replace("ca-", "");
  const body = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
