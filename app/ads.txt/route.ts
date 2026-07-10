export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXX";
  const publisher = client.replace("ca-", "");
  const body = client === "ca-pub-XXXX" ? "# Replace NEXT_PUBLIC_ADSENSE_CLIENT with your real AdSense publisher ID.\n" : `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
