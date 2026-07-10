export function cleanText(value: string) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u20ac\u009d|\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u20ac\u0153/g, "-")
    .replace(/\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u201e\u00a2/g, "'")
    .replace(/\u00c3\u00a2\u00e2\u201a\u00ac\u00c5\u201c|\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u009d/g, "\"")
    .replace(/\u00c3\u201a\u00c2\u00b7|\u00c2\u00b7/g, " - ")
    .replace(/\u00c3\u00b0\u00c5\u00b8[\s\S]?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function excerpt(value: string, max = 220) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}...`;
}
