const CACHE = "civics128-v9";
const AUDIO_CACHE = "civics128-audio-v1"; // filled only when the user taps "Download audio for offline"
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "audio/audio.json", "audio/clips.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && !k.startsWith("civics128-audio")).map(k => caches.delete(k))))
    // purge voice clips of removed features (only the civics question clips sq1..sq128 remain)
    .then(() => caches.open(AUDIO_CACHE)).then(c => c.keys().then(ks => Promise.all(ks.filter(r => { const p = new URL(r.url).pathname; return p.includes("/audio/clips/") && !/\/sq\d+\.mp3$/.test(p); }).map(r => c.delete(r))))).catch(() => {})
    .then(() => self.clients.claim()));
});
// Serve a byte range from a cached full MP3 (Safari's <audio> always asks for ranges).
async function ranged(res, req) {
  const range = req.headers.get("range");
  if (!range) return res;
  const buf = await res.arrayBuffer(); const size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  let start = m[1] ? +m[1] : 0, end = m[2] ? +m[2] : size - 1;
  if (!m[1] && m[2]) { start = Math.max(0, size - +m[2]); end = size - 1; }
  end = Math.min(end, size - 1);
  if (start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    "Content-Type": "audio/mpeg", "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes" } });
}
self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.includes("/audio/clips/") && url.pathname.endsWith(".mp3")) {
    // Short voice clips (a few KB each): cache on first play so they also work offline later.
    const key = url.origin + url.pathname;
    e.respondWith(caches.open(AUDIO_CACHE).then(c => c.match(key).then(hit => hit ? ranged(hit, req) :
      fetch(key).then(res => { if (res.ok && res.status === 200) { c.put(key, res.clone()); return ranged(res, req); } return res; }))));
    return;
  }
  if (url.pathname.endsWith(".mp3")) {
    // MP3s are NOT cached automatically: use the offline copy if the user downloaded it, else go to the network.
    e.respondWith(caches.open(AUDIO_CACHE).then(c => c.match(url.origin + url.pathname)).then(hit => hit ? ranged(hit, req) : fetch(req)));
    return;
  }
  if (url.pathname.endsWith("/audio/audio.json") || url.pathname.endsWith("/audio/clips.json")) {
    e.respondWith(fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  // Cache-first for app files; navigations fall back to the cached app shell when offline.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === "navigate" ? caches.match("index.html") : Response.error()))
  );
});
