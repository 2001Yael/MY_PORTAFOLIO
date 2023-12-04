// service-worker.js

// Define el nombre de la caché
const CACHE_NAME = 'my-site-cache-v1';

// Lista de archivos que se deben cachear
const urlsToCache = [
  '/',
  'index.html',
  'estilos.css',
  'main.js',
  // Agrega aquí otros archivos que deseas cachear
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta las solicitudes y responde desde la caché, si está disponible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
