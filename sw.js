const CACHE_VERSION="impostor-v2";
const CORE=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;const html=r.mode==="navigate"||(r.headers.get("accept")||"").includes("text/html");
  if(html){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(CACHE_VERSION).then(ca=>ca.put(r,c));return n;}).catch(()=>caches.match(r).then(c=>c||caches.match("./index.html"))));return;}
  e.respondWith(caches.match(r).then(c=>c||fetch(r).then(n=>{if(n&&n.status===200){const cc=n.clone();caches.open(CACHE_VERSION).then(ca=>ca.put(r,cc));}return n;}).catch(()=>c)));
});
