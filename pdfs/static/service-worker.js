const CACHE_NAME = "revistas-cache-v1";
const urlsToCache = ['logo.webp', 'favicon.ico', 'site.webmanifest', '../IntegralDefinida.pdf', 'IntegralDefinida.webp', '../014_GuiaAMI_2025_16_10.pdf', '014_GuiaAMI_2025_16_10.webp', '../P3%20AMI%202025%2009%2026%20A3.pdf', 'P3%20AMI%202025%2009%2026%20A3.webp', '../Metodos%20Integracion.pdf', 'Metodos%20Integracion.webp'];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() =>
        new Response("No hay conexión y el recurso no está en caché.", {
          headers: { "Content-Type": "text/plain" }
        })
      )
    )
  );
});