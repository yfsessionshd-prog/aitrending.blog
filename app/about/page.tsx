export default function AboutPage() {
  return <LegalPage title="About AITrending" body="AITrending is an independent automated publication tracking artificial intelligence news, model releases, developer tools, research signals and market trends. Coverage is produced by an editorial automation pipeline and reviewed through quality rules designed for clarity, attribution and usefulness." />;
}

function LegalPage({ title, body }: { title: string; body: string }) {
  return <main className="mx-auto max-w-3xl px-4 py-14"><h1 className="font-display text-5xl font-bold">{title}</h1><p className="mt-6 text-lg leading-8 text-white/65">{body}</p></main>;
}
