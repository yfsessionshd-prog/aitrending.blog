import { slugify } from "./http";
import { discoverGitHubRepos } from "./github-radar";
import { getToolStore, saveToolStore } from "./tool-store";
import type { IdeaItem, PromptItem } from "./types";

function fallbackPrompts(): PromptItem[] {
  return [
    {
      id: "prompt-youtube-ai-channel",
      title: "Faceless YouTube AI channel planner",
      category: "Content",
      prompt: "Act as a YouTube strategist. Create 20 faceless video ideas about AI for [audience], with hooks, titles, thumbnails, retention beats and monetization angle.",
      description: "Turns AI news into a monetizable content plan.",
      popularity: 96
    },
    {
      id: "prompt-ai-workflow-builder",
      title: "AI workflow automation builder",
      category: "Automation",
      prompt: "Map a full AI automation for [business process]. Include triggers, tools, database fields, failure handling, approval steps and cost controls.",
      description: "Useful for building real client automations.",
      popularity: 92
    },
    {
      id: "prompt-side-hustle-validator",
      title: "AI side hustle validator",
      category: "Make Money",
      prompt: "Evaluate this AI business idea: [idea]. Score demand, difficulty, competition, tools needed, pricing, first offer and 7-day validation plan.",
      description: "Validates money-making ideas before building.",
      popularity: 90
    },
    {
      id: "prompt-github-repo-explainer",
      title: "GitHub repo explainer",
      category: "GitHub",
      prompt: "Explain this GitHub repository for a beginner: [repo URL or README]. Cover what it does, who should use it, installation difficulty, use cases, risks and one project idea.",
      description: "Turns technical repos into plain-language explanations.",
      popularity: 88
    },
    {
      id: "prompt-ai-agent-designer",
      title: "AI agent designer",
      category: "Agents",
      prompt: "Design an AI agent for [task]. Define goal, tools, memory, inputs, outputs, approval steps, failure handling and a test checklist.",
      description: "Creates a production-minded agent blueprint.",
      popularity: 91
    },
    {
      id: "prompt-rag-app-builder",
      title: "RAG app builder",
      category: "Software",
      prompt: "Create a full RAG app plan for [document type]. Include data ingestion, chunking, embeddings, retrieval, UI, auth, costs and deployment steps.",
      description: "Useful for document chat and knowledge-base apps.",
      popularity: 87
    },
    {
      id: "prompt-ai-learning-roadmap",
      title: "AI learning roadmap",
      category: "Learning",
      prompt: "Build a 30-day learning roadmap for [skill level] to learn practical AI. Include daily tasks, free resources, projects and portfolio outcomes.",
      description: "Guides beginners into practical AI skills.",
      popularity: 93
    },
    {
      id: "prompt-ai-publishing-plan",
      title: "AI publishing plan",
      category: "Publishing",
      prompt: "Create a trustworthy AI publishing strategy for [niche]. Include high-intent topics, article clusters, internal links, legal pages, expert review rules and quality checks.",
      description: "Plans informational AI websites built for useful organic traffic.",
      popularity: 85
    },
    {
      id: "prompt-ai-tool-comparison",
      title: "AI tool comparison",
      category: "Tools",
      prompt: "Compare these AI tools: [tools]. Evaluate pricing, best use case, limitations, ideal user, workflow fit and final recommendation.",
      description: "Creates useful comparison content for readers.",
      popularity: 86
    },
    {
      id: "prompt-client-automation-offer",
      title: "Client automation offer",
      category: "Make Money",
      prompt: "Create a paid AI automation offer for [business type]. Include pain points, deliverables, pricing tiers, onboarding questions and demo workflow.",
      description: "Helps package AI services for clients.",
      popularity: 89
    }
  ];
}

function fallbackIdeas(): IdeaItem[] {
  return [
    {
      id: "idea-prompt-pack-store",
      title: "Prompt pack store for one profession",
      category: "Make Money",
      description: "Create prompt packs for lawyers, realtors, fitness coaches or creators, with examples and templates.",
      monetization: "Digital product sales, bundles and newsletter upsells.",
      difficulty: "Easy"
    },
    {
      id: "idea-ai-agent-templates",
      title: "AI agent templates marketplace",
      category: "Agents",
      description: "Publish ready-to-use agent workflows for research, sales follow-up, content repurposing and customer support.",
      monetization: "Paid templates, subscriptions and implementation services.",
      difficulty: "Medium"
    },
    {
      id: "idea-ai-software-micro-saas",
      title: "Micro SaaS for AI summaries",
      category: "Software",
      description: "Build a simple product that summarizes calls, PDFs or niche documents for a specific market.",
      monetization: "Monthly subscription with free trial.",
      difficulty: "Advanced"
    },
    {
      id: "idea-ai-newsletter",
      title: "AI opportunity newsletter",
      category: "Publishing",
      description: "Curate new AI tools, GitHub repos, prompts and automation ideas for one specific audience.",
      monetization: "Sponsorships, premium research briefs and partnerships.",
      difficulty: "Easy"
    },
    {
      id: "idea-github-repo-tutorials",
      title: "GitHub repo tutorial hub",
      category: "GitHub",
      description: "Explain trending AI repos with simple setup guides, examples and use cases.",
      monetization: "Affiliate tools, sponsored tutorials and premium guides.",
      difficulty: "Medium"
    },
    {
      id: "idea-ai-template-library",
      title: "AI template library",
      category: "Prompts",
      description: "Sell reusable prompt packs, automation templates and workflow docs for creators and small businesses.",
      monetization: "One-time product sales and subscriptions.",
      difficulty: "Easy"
    },
    {
      id: "idea-local-ai-workshops",
      title: "Local AI workshops",
      category: "Services",
      description: "Teach local businesses how to use AI for customer support, content, reporting and sales follow-up.",
      monetization: "Paid workshops plus implementation packages.",
      difficulty: "Medium"
    },
    {
      id: "idea-ai-job-board",
      title: "AI niche job board",
      category: "Jobs",
      description: "Create a focused job board for AI automation, prompt engineering, model ops or AI content roles.",
      monetization: "Paid listings, featured companies and newsletter sponsorship.",
      difficulty: "Advanced"
    },
    {
      id: "idea-ai-calculator-tools",
      title: "AI calculators and free tools",
      category: "Software",
      description: "Build small calculators for token cost, automation ROI, model comparison or prompt quality scoring.",
      monetization: "Lead capture, partnerships and paid upgrades.",
      difficulty: "Medium"
    },
    {
      id: "idea-ai-content-repurposer",
      title: "AI content repurposing service",
      category: "Services",
      description: "Turn podcasts, videos and webinars into clips, posts, newsletters and articles.",
      monetization: "Monthly content operations retainer.",
      difficulty: "Easy"
    }
  ];
}

async function generateToolContent() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return { prompts: fallbackPrompts(), ideas: fallbackIdeas() };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "AITrending"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "system",
            content: "Return only valid JSON. Create practical, safe, non-deceptive AI prompts and monetization ideas for a free AI education website."
          },
          {
            role: "user",
            content: "Generate JSON with keys prompts and ideas. prompts: 8 items with title, category, prompt, description, popularity 70-100. ideas: 8 items with title, category, description, monetization, difficulty Easy/Medium/Advanced. Focus on AI tools, GitHub repos, agents, prompts, software ideas, learning AI and ethical ways to make money with AI."
          }
        ],
        temperature: 0.45,
        max_tokens: 1800,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) return { prompts: fallbackPrompts(), ideas: fallbackIdeas() };
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.match(/\{[\s\S]*\}/)?.[0] || "{}") as { prompts?: PromptItem[]; ideas?: IdeaItem[] };
    const prompts = (parsed.prompts || fallbackPrompts()).map((item) => ({ ...item, id: item.id || slugify(item.title) })).slice(0, 12);
    const ideas = (parsed.ideas || fallbackIdeas()).map((item) => ({ ...item, id: item.id || slugify(item.title) })).slice(0, 12);
    return { prompts, ideas };
  } catch {
    return { prompts: fallbackPrompts(), ideas: fallbackIdeas() };
  }
}

export async function runToolAutomation() {
  const current = getToolStore();
  const [repos, generated] = await Promise.all([
    discoverGitHubRepos().catch(() => current.repos),
    generateToolContent()
  ]);

  return saveToolStore({
    repos: repos.length ? repos : current.repos,
    prompts: generated.prompts.length ? generated.prompts : current.prompts,
    ideas: generated.ideas.length ? generated.ideas : current.ideas
  });
}
