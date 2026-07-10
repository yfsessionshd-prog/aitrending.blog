import type { Article, Category, ModelLaunch, Trend } from "./types";

export const categories: Category[] = ["News", "AI Models", "Tools", "Analysis", "Explainers", "Open Source", "Robotics", "Startups", "Research", "Business", "Security"];

export const articles: Article[] = [
  {
    slug: "open-models-enter-enterprise-race",
    title: "Open models enter the enterprise race with faster releases and lower inference costs",
    excerpt: "A new wave of open-weight releases is forcing enterprise AI teams to revisit hosting, compliance and cost assumptions.",
    category: "AI Models",
    publishedAt: "2026-07-10T08:30:00.000Z",
    readingMinutes: 6,
    views: "42.8K",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    featured: true,
    body: [
      "Enterprise AI teams are moving from evaluation decks to procurement decisions. The new priority is not only model quality, but whether a system can be audited, hosted predictably and upgraded without locking the company into a single vendor.",
      "Open-weight models are gaining traction because they let technical teams control inference location, customize safety layers and run cost tests with transparent assumptions. The tradeoff is operational complexity: serving, monitoring, fallback routing and governance become internal responsibilities.",
      "The practical result is a two-track market. Frontier hosted models remain the default for complex reasoning and multimodal workflows, while efficient open models increasingly handle classification, extraction, support triage and internal knowledge retrieval.",
      "For buyers, the next benchmark will be total cost per successful task. That number includes latency, retries, human review and maintenance, not only the token price shown on a pricing page."
    ]
  },
  {
    slug: "ai-agents-shift-from-demos-to-ops",
    title: "AI agents shift from demos to operations as companies demand measurable handoffs",
    excerpt: "Agent systems are being evaluated on traceability, recovery and human approval points rather than broad autonomy claims.",
    category: "Analysis",
    publishedAt: "2026-07-10T07:05:00.000Z",
    readingMinutes: 5,
    views: "31.2K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    body: [
      "The agent market is maturing around a less dramatic but more useful idea: software that can complete bounded workflows, ask for approval at the right moments and produce logs that operations teams can trust.",
      "The strongest deployments treat agents as supervised workflow steps. They define tools, permissions, fallback rules and measurable outcomes before giving the model any room to act.",
      "That shift matters because reliability is now a product requirement. Buyers want to know what happens when a tool call fails, a user changes the instruction or a policy blocks the next step."
    ]
  },
  {
    slug: "github-ai-repos-surge",
    title: "GitHub AI repositories surge as small teams package internal tools into public products",
    excerpt: "Open-source AI utilities are increasingly becoming the launchpad for commercial developer tools.",
    category: "Open Source",
    publishedAt: "2026-07-09T21:12:00.000Z",
    readingMinutes: 4,
    views: "18.9K",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Developer attention is concentrating around repositories that solve one narrow production problem well: evaluation, prompt routing, observability, structured extraction or vector maintenance.",
      "The pattern is familiar. A team builds an internal utility, publishes the core, then sells hosted infrastructure, support or compliance features around it."
    ]
  },
  {
    slug: "robotics-foundation-models",
    title: "Robotics labs test foundation models against warehouse edge cases",
    excerpt: "The hardest robotics tasks remain messy physical exceptions rather than clean benchmark demonstrations.",
    category: "Robotics",
    publishedAt: "2026-07-09T17:40:00.000Z",
    readingMinutes: 7,
    views: "15.4K",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Robotics teams are testing whether foundation models can generalize from structured demos to imperfect production spaces. Warehouses provide a useful test because the environment is controlled but still full of irregular items, lighting changes and occlusions.",
      "The companies closest to deployment are combining learned policies with conventional safety systems and narrow task definitions."
    ]
  },
  {
    slug: "ai-search-tools-comparison",
    title: "The new AI search tools compete on citations, freshness and workflow memory",
    excerpt: "Search experiences are splitting into answer engines, research notebooks and enterprise knowledge layers.",
    category: "Tools",
    publishedAt: "2026-07-09T12:18:00.000Z",
    readingMinutes: 5,
    views: "26.1K",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    body: [
      "AI search is no longer a single product category. Consumer tools optimize for fast answers, research products optimize for source handling and enterprise systems optimize for permission-aware retrieval.",
      "The clearest differentiator is not the summary itself. It is whether the system can show provenance, refresh stale claims and preserve useful context across a project."
    ]
  },
  {
    slug: "enterprise-ai-budget-shift",
    title: "Enterprise AI budgets shift from experiments to measurable workflow deployment",
    excerpt: "CIOs are asking AI vendors for reliability, audit logs and clear cost-per-task numbers before expanding deployments.",
    category: "Business",
    publishedAt: "2026-07-08T15:45:00.000Z",
    readingMinutes: 5,
    views: "19.6K",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    body: [
      "The next wave of enterprise AI spending is moving away from isolated pilots and toward workflows with measurable business outcomes.",
      "Buyers want to know how systems behave when a tool call fails, a permission blocks access or a model response needs review.",
      "That pressure is forcing vendors to improve observability, pricing transparency and integration with existing operations."
    ]
  },
  {
    slug: "ai-design-tools-product-teams",
    title: "AI design tools become part of product teams' daily workflow",
    excerpt: "Design teams are using AI for ideation, prototyping, copy variants and faster handoff between product and engineering.",
    category: "Tools",
    publishedAt: "2026-07-08T11:25:00.000Z",
    readingMinutes: 4,
    views: "14.2K",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    body: [
      "AI design features are shifting from novelty demos into everyday product workflows.",
      "Teams use them to explore layouts, write interface copy, generate quick visual directions and prepare assets for review.",
      "The strongest use cases keep designers in control while removing repetitive production steps."
    ]
  }
];

export const trends: Trend[] = [
  { rank: 1, label: "OpenAI agent SDK", delta: "up" },
  { rank: 2, label: "Gemini robotics", delta: "up" },
  { rank: 3, label: "Claude coding workflows", delta: "down" },
  { rank: 4, label: "AI search citations", delta: "up" },
  { rank: 5, label: "Open-source evals", delta: "up" }
];

export const modelLaunches: ModelLaunch[] = [
  { name: "OpenAI", version: "GPT-4.1 family", date: "Jul 2026" },
  { name: "Anthropic", version: "Claude Sonnet tier", date: "Jul 2026" },
  { name: "Google", version: "Gemini developer stack", date: "Jul 2026" }
];

export function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articlesByCategory(category: string) {
  return articles.filter((article) => article.category.toLowerCase().replaceAll(" ", "-") === category);
}
