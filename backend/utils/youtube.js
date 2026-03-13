function extractYouTubeVideoId(input) {
  if (!input) return null;
  const raw = String(input).trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = url.searchParams.get("v");
      if (v) return v;

      const parts = url.pathname.split("/").filter(Boolean);
      const [first, second] = parts;
      if (first === "embed" && second) return second;
      if (first === "shorts" && second) return second;
      if (first === "watch") {
        const v2 = url.searchParams.get("v");
        if (v2) return v2;
      }
    }
  } catch {
    // fallthrough to regex extraction
  }

  const match = raw.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/i,
  );
  return match?.[1] || null;
}

function toYouTubeEmbedUrl(input) {
  const id = extractYouTubeVideoId(input);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}`;
}

module.exports = { extractYouTubeVideoId, toYouTubeEmbedUrl };

