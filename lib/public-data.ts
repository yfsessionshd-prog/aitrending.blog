import type { Article } from "./types";

export type AiModel = {
  slug: string;
  name: string;
  company: string;
  type: string;
  access: "Open Source" | "Commercial";
  pricing: "Free" | "Paid" | "Freemium";
  context: string;
  rating: number;
  released: string;
  description: string;
  officialUrl: string;
};

export type AiTool = {
  slug: string;
  name: string;
  category: string;
  price: string;
  freePlan: boolean;
  rating: number;
  description: string;
  officialUrl: string;
  alternatives: string[];
};

export type Topic = {
  slug: string;
  title: string;
  interactions: string;
  updated: string;
  description: string;
};

export const aiModels: AiModel[] = [
  { slug: "gpt-4-1", name: "GPT-4.1", company: "OpenAI", type: "Multimodal", access: "Commercial", pricing: "Paid", context: "1M tokens", rating: 4.8, released: "2026", description: "High-capability model family for coding, reasoning, document analysis and production AI apps.", officialUrl: "https://openai.com" },
  { slug: "claude-sonnet", name: "Claude Sonnet", company: "Anthropic", type: "Text / Coding", access: "Commercial", pricing: "Paid", context: "Large", rating: 4.7, released: "2026", description: "Strong model for writing, coding workflows, agents and enterprise assistant use cases.", officialUrl: "https://anthropic.com" },
  { slug: "gemini", name: "Gemini", company: "Google DeepMind", type: "Multimodal", access: "Commercial", pricing: "Freemium", context: "Large", rating: 4.6, released: "2026", description: "Google model stack for search, productivity, multimodal apps and developer integrations.", officialUrl: "https://deepmind.google" },
  { slug: "llama", name: "Llama", company: "Meta", type: "Text", access: "Open Source", pricing: "Free", context: "Varies", rating: 4.5, released: "2026", description: "Open-weight model family used by teams that need local hosting and customization.", officialUrl: "https://ai.meta.com" },
  { slug: "mistral", name: "Mistral", company: "Mistral AI", type: "Text / Coding", access: "Open Source", pricing: "Freemium", context: "Varies", rating: 4.4, released: "2026", description: "Efficient European model family for open and commercial AI deployments.", officialUrl: "https://mistral.ai" },
  { slug: "qwen", name: "Qwen", company: "Alibaba Cloud", type: "Multimodal", access: "Open Source", pricing: "Free", context: "Varies", rating: 4.4, released: "2026", description: "Open model family popular for coding, multilingual use and local experimentation.", officialUrl: "https://qwenlm.github.io" },
  { slug: "deepseek", name: "DeepSeek", company: "DeepSeek", type: "Reasoning", access: "Open Source", pricing: "Freemium", context: "Varies", rating: 4.5, released: "2026", description: "Reasoning-focused model ecosystem used for coding, math and analysis workflows.", officialUrl: "https://www.deepseek.com" },
  { slug: "stable-diffusion", name: "Stable Diffusion", company: "Stability AI", type: "Image", access: "Open Source", pricing: "Free", context: "Image", rating: 4.3, released: "2026", description: "Image generation ecosystem with local workflows, fine-tuning and creative pipelines.", officialUrl: "https://stability.ai" },
  { slug: "whisper", name: "Whisper", company: "OpenAI", type: "Audio", access: "Open Source", pricing: "Free", context: "Audio", rating: 4.6, released: "2026", description: "Speech recognition model widely used for transcription and media pipelines.", officialUrl: "https://openai.com" },
  { slug: "phi", name: "Phi", company: "Microsoft", type: "Small Language Model", access: "Open Source", pricing: "Free", context: "Varies", rating: 4.2, released: "2026", description: "Compact model family for edge, low-cost and embedded AI applications.", officialUrl: "https://microsoft.com/ai" }
];

export const aiTools: AiTool[] = [
  { slug: "cursor", name: "Cursor", category: "Coding", price: "Freemium", freePlan: true, rating: 4.8, description: "AI-native code editor for software teams and solo builders.", officialUrl: "https://cursor.com", alternatives: ["GitHub Copilot", "Windsurf"] },
  { slug: "perplexity", name: "Perplexity", category: "Research", price: "Freemium", freePlan: true, rating: 4.7, description: "AI answer engine for research, citations and web-backed discovery.", officialUrl: "https://perplexity.ai", alternatives: ["ChatGPT Search", "Google AI Mode"] },
  { slug: "midjourney", name: "Midjourney", category: "Image", price: "Paid", freePlan: false, rating: 4.6, description: "Premium image generation tool for art direction and concept visuals.", officialUrl: "https://midjourney.com", alternatives: ["Ideogram", "Leonardo"] },
  { slug: "runway", name: "Runway", category: "Video", price: "Freemium", freePlan: true, rating: 4.5, description: "Video generation and editing platform for creators and studios.", officialUrl: "https://runwayml.com", alternatives: ["Pika", "Luma"] },
  { slug: "elevenlabs", name: "ElevenLabs", category: "Audio", price: "Freemium", freePlan: true, rating: 4.7, description: "Voice generation, dubbing and audio tools for media production.", officialUrl: "https://elevenlabs.io", alternatives: ["PlayHT", "Murf"] },
  { slug: "notion-ai", name: "Notion AI", category: "Productivity", price: "Paid", freePlan: false, rating: 4.2, description: "AI writing and knowledge workflows inside Notion workspaces.", officialUrl: "https://notion.so", alternatives: ["Coda AI", "Mem"] },
  { slug: "zapier-ai", name: "Zapier AI", category: "Automation", price: "Freemium", freePlan: true, rating: 4.4, description: "Automation platform with AI steps for business workflows.", officialUrl: "https://zapier.com", alternatives: ["Make", "n8n"] },
  { slug: "canva-ai", name: "Canva AI", category: "Design", price: "Freemium", freePlan: true, rating: 4.3, description: "Design platform with image, writing and layout AI tools.", officialUrl: "https://canva.com", alternatives: ["Adobe Express", "Figma AI"] },
  { slug: "jasper", name: "Jasper", category: "Marketing", price: "Paid", freePlan: false, rating: 4.1, description: "AI marketing content platform for teams and brand workflows.", officialUrl: "https://jasper.ai", alternatives: ["Copy.ai", "Writer"] },
  { slug: "elicit", name: "Elicit", category: "Research", price: "Freemium", freePlan: true, rating: 4.3, description: "Research assistant for papers, evidence tables and literature review.", officialUrl: "https://elicit.com", alternatives: ["Consensus", "Perplexity"] },
  { slug: "github-copilot", name: "GitHub Copilot", category: "Coding", price: "Paid", freePlan: false, rating: 4.6, description: "AI pair programmer for code completion, chat and development workflows.", officialUrl: "https://github.com/features/copilot", alternatives: ["Cursor", "Codeium"] },
  { slug: "n8n", name: "n8n", category: "Automation", price: "Freemium", freePlan: true, rating: 4.5, description: "Workflow automation platform popular for AI agent pipelines.", officialUrl: "https://n8n.io", alternatives: ["Zapier", "Make"] },
  { slug: "figma-ai", name: "Figma AI", category: "Design", price: "Freemium", freePlan: true, rating: 4.2, description: "Design assistant features for ideation, layout and product workflows.", officialUrl: "https://figma.com", alternatives: ["Canva AI", "Adobe Firefly"] },
  { slug: "descript", name: "Descript", category: "Audio", price: "Freemium", freePlan: true, rating: 4.4, description: "AI editing suite for podcasts, videos, transcripts and voice workflows.", officialUrl: "https://descript.com", alternatives: ["Runway", "ElevenLabs"] },
  { slug: "synthesia", name: "Synthesia", category: "Video", price: "Paid", freePlan: false, rating: 4.2, description: "AI video avatar platform for training, explainers and corporate communication.", officialUrl: "https://synthesia.io", alternatives: ["HeyGen", "Runway"] },
  { slug: "heygen", name: "HeyGen", category: "Video", price: "Freemium", freePlan: true, rating: 4.3, description: "Avatar video generation and localization platform for marketing and training.", officialUrl: "https://heygen.com", alternatives: ["Synthesia", "D-ID"] },
  { slug: "writesonic", name: "Writesonic", category: "Writing", price: "Freemium", freePlan: true, rating: 4.1, description: "AI writing platform for articles, ads, landing pages and SEO content.", officialUrl: "https://writesonic.com", alternatives: ["Jasper", "Copy.ai"] },
  { slug: "copy-ai", name: "Copy.ai", category: "Writing", price: "Freemium", freePlan: true, rating: 4.1, description: "AI copywriting and go-to-market workflow tool for business teams.", officialUrl: "https://copy.ai", alternatives: ["Jasper", "Writesonic"] },
  { slug: "fireflies", name: "Fireflies", category: "Productivity", price: "Freemium", freePlan: true, rating: 4.2, description: "Meeting transcription, summaries and action-item extraction for teams.", officialUrl: "https://fireflies.ai", alternatives: ["Otter", "Fathom"] },
  { slug: "consensus", name: "Consensus", category: "Research", price: "Freemium", freePlan: true, rating: 4.3, description: "Evidence-focused AI search engine for scientific papers and claims.", officialUrl: "https://consensus.app", alternatives: ["Elicit", "Perplexity"] }
];

export const explainers: Article[] = [
  { slug: "what-is-rag", title: "What is RAG and why AI teams use it", excerpt: "Retrieval-augmented generation explained in plain language for builders and product teams.", category: "Explainers", publishedAt: "2026-07-08T10:00:00.000Z", readingMinutes: 5, views: "12.3K", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", body: ["RAG connects a language model to external knowledge so answers can use fresh or private context.", "The model does not memorize the database. The application retrieves relevant chunks and gives them to the model at answer time.", "This pattern is useful for document search, support assistants, research tools and internal knowledge bases."] },
  { slug: "ai-agents-explained", title: "AI agents explained without the hype", excerpt: "A practical guide to goals, tools, memory, approvals and failure handling.", category: "Explainers", publishedAt: "2026-07-08T09:00:00.000Z", readingMinutes: 6, views: "15.1K", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", body: ["An AI agent is a workflow where a model can decide steps and use tools to complete a bounded task.", "Good agents are not unlimited autonomous systems. They have clear permissions, logs, fallbacks and approval points.", "The best use cases are repetitive tasks with structured tools and measurable outputs."] },
  { slug: "open-source-models", title: "Open-source AI models: what they are good for", excerpt: "How companies use open models for cost control, privacy and customization.", category: "Explainers", publishedAt: "2026-07-07T12:00:00.000Z", readingMinutes: 5, views: "10.2K", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80", body: ["Open-weight models let teams run AI on their own infrastructure or customize model behavior.", "They are useful when privacy, latency and cost control matter more than maximum frontier capability.", "The tradeoff is operational complexity: hosting, monitoring and evaluation become internal responsibilities."] },
  { slug: "multimodal-ai", title: "Multimodal AI: text, image, audio and video in one system", excerpt: "Why AI products increasingly combine multiple input and output types.", category: "Explainers", publishedAt: "2026-07-07T08:30:00.000Z", readingMinutes: 4, views: "9.4K", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", body: ["Multimodal AI processes more than text. It can understand images, audio, video and documents.", "This unlocks workflows like visual inspection, meeting analysis, document extraction and media generation.", "The challenge is designing interfaces that make those capabilities understandable and reliable."] },
  { slug: "prompt-engineering", title: "Prompt engineering that still matters", excerpt: "The practical prompting habits that survive better models.", category: "Explainers", publishedAt: "2026-07-06T14:20:00.000Z", readingMinutes: 4, views: "13.7K", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", body: ["Better models reduce the need for fragile prompt tricks, but clear instructions still matter.", "Strong prompts define role, context, constraints, examples and output format.", "For production, prompts should be evaluated like code: tested, versioned and monitored."] },
  { slug: "ai-evaluation", title: "How AI evaluation works in real products", excerpt: "A simple guide to benchmarks, test sets, human review and production monitoring.", category: "Explainers", publishedAt: "2026-07-06T10:10:00.000Z", readingMinutes: 5, views: "8.8K", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", body: ["Evaluation measures whether an AI system works for a specific task, not whether a model is impressive in general.", "Teams combine automated tests, sample datasets, human review and production monitoring.", "Good evaluation catches regressions before users see them."] },
  { slug: "context-windows", title: "Context windows explained", excerpt: "What token limits mean and why longer context is not always better.", category: "Explainers", publishedAt: "2026-07-05T16:00:00.000Z", readingMinutes: 4, views: "7.9K", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", body: ["A context window is the amount of information a model can consider at once.", "Long context helps with documents and codebases, but it can increase cost and latency.", "Strong systems still retrieve and structure information carefully."] },
  { slug: "ai-video-generation", title: "AI video generation: what is production-ready", excerpt: "Where AI video tools work today and where human review still matters.", category: "Explainers", publishedAt: "2026-07-05T12:00:00.000Z", readingMinutes: 5, views: "9.1K", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80", body: ["AI video tools are useful for ideation, short clips, background motion and previsualization.", "Long narrative scenes still require careful direction, editing and consistency checks.", "The best workflows combine generated shots with human creative control."] },
  { slug: "ai-security-basics", title: "AI security basics for builders", excerpt: "Prompt injection, data leakage and tool permissions explained clearly.", category: "Explainers", publishedAt: "2026-07-04T15:00:00.000Z", readingMinutes: 6, views: "8.5K", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80", body: ["AI security starts with assuming model input can be hostile.", "Prompt injection can try to override instructions or misuse connected tools.", "Production systems need permission boundaries, logging, validation and human approval for sensitive actions."] },
  { slug: "ai-costs", title: "How AI costs add up", excerpt: "Tokens, retries, latency, hosting and review costs in one practical guide.", category: "Explainers", publishedAt: "2026-07-04T09:20:00.000Z", readingMinutes: 5, views: "7.6K", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80", body: ["AI costs include more than model tokens. Teams also pay for retries, storage, vector search, hosting and human review.", "A cheap model can become expensive if it fails often or needs many retries.", "The right metric is cost per successful task."] }
];

export const topics: Topic[] = [
  { slug: "ai-agents", title: "AI Agents", interactions: "184K", updated: "8m ago", description: "Agent frameworks, tool calling, workflow automation and enterprise assistants." },
  { slug: "open-source-ai", title: "Open Source AI", interactions: "142K", updated: "11m ago", description: "Open-weight models, GitHub projects, local inference and community tooling." },
  { slug: "ai-coding", title: "AI Coding", interactions: "128K", updated: "14m ago", description: "Code assistants, developer workflows, IDE integrations and software automation." },
  { slug: "ai-video", title: "AI Video", interactions: "92K", updated: "19m ago", description: "Video generation, editing, avatars and production pipelines." },
  { slug: "ai-search", title: "AI Search", interactions: "87K", updated: "21m ago", description: "Answer engines, citations, AI browsers and research assistants." },
  { slug: "robotics", title: "Robotics", interactions: "76K", updated: "24m ago", description: "Foundation models for robots, warehouses, embodied AI and automation." },
  { slug: "ai-business", title: "AI Business", interactions: "69K", updated: "31m ago", description: "Funding, products, pricing, enterprise adoption and monetization." },
  { slug: "research", title: "AI Research", interactions: "64K", updated: "36m ago", description: "Papers, benchmarks, evaluations and new model architectures." },
  { slug: "image-generation", title: "Image Generation", interactions: "58K", updated: "42m ago", description: "Creative tools, image models, design workflows and visual production." },
  { slug: "ai-security", title: "AI Security", interactions: "51K", updated: "48m ago", description: "Model safety, prompt injection, enterprise policy and data protection." }
];
