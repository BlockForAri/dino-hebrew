const CACHE_NAME = 'dinohebrew-v1';
const ASSETS = [
  './dino-hebrew-web.html',
  './manifest.json',
  './imagine_images/tXtkd.jpg',
  './imagine_images/Dh80Q.jpg',
  './imagine_images/mAPYW.jpg',
  './imagine_images/xT9js.jpg',
  './imagine_images/0NHb7.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
