"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { useMemo, useState } from "react";
import { slugify } from "@/lib/http";

export function AdminArticleEditor() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, LinkExtension, ImageExtension],
    immediatelyRender: false,
    content: "<p>Write the article body here...</p>"
  });
  const slug = useMemo(() => slugify(title || "new-article"), [title]);

  async function publish(formData: FormData) {
    setMessage("Publishing...");
    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        excerpt: formData.get("excerpt"),
        category: formData.get("category"),
        image: formData.get("image"),
        tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
        content: editor?.getText({ blockSeparator: "\n\n" }),
        featured: formData.get("featured") === "on"
      })
    });
    setMessage(response.ok ? "Article published." : "Could not publish article.");
  }

  return (
    <form action={publish} className="rounded-xl border border-white/5 bg-card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <input value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="Article title" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
        <input value={slug} readOnly className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white/50 outline-none" />
      </div>
      <textarea name="excerpt" required placeholder="Meta description / excerpt" rows={3} className="mt-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <select name="category" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan">
          {["News", "AI Models", "Tools", "Analysis", "Research", "Business", "Security"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <input name="tags" placeholder="tags, separated, by comma" className="rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white/70"><input name="featured" type="checkbox" /> Feature on home</label>
      </div>
      <input name="image" placeholder="Hero image URL" className="mt-4 w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm outline-none focus:border-cyan" />
      <div className="mt-4 rounded-lg border border-white/10 bg-ink/70 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="rounded border border-white/10 px-3 py-1 text-xs">Bold</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="rounded border border-white/10 px-3 py-1 text-xs">Italic</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="rounded border border-white/10 px-3 py-1 text-xs">H2</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="rounded border border-white/10 px-3 py-1 text-xs">List</button>
        </div>
        <EditorContent editor={editor} className="min-h-56 text-sm leading-7 text-white/75 outline-none" />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-lg bg-cyan px-5 py-3 text-sm font-bold text-ink">Publish</button>
        <button type="button" className="rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-white/65">Save draft</button>
        <button type="button" className="rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-white/65">Preview</button>
      </div>
      {message ? <p className="mt-3 text-sm text-white/55">{message}</p> : null}
    </form>
  );
}
