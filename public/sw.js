importScripts('/workbox-sw.js');

if (workbox) {
    console.log('[SW] Workbox loaded!');
    console.log(workbox)
} else {
    console.log('[SW] Workbox failed to load!');
}

workbox.setConfig({
    debug: false
});

workbox.loadModule('workbox-precaching');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

self.__WB_MANIFEST;

const CACHE_VERSION = 'v1';

// Log برای تست اینکه سرویس‌ورکر فعال شده
console.log('[SW] Service Worker loaded!');

// precache فایل‌های build شده توسط Workbox
// self.__WB_MANIFEST && self.__WB_MANIFEST.length && console.log('[SW] Precache manifest:', self.__WB_MANIFEST);

// SPA fallback
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('/index.html').then(resp => resp || fetch('/index.html'))
        );
    }
});

// Cache CSS files
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: `css-cache-${CACHE_VERSION}`,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            }),
        ],
    })
);

// Cache JS files
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: `js-cache-${CACHE_VERSION}`,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            }),
        ],
    })
);

// Cache image files
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: `image-cache-${CACHE_VERSION}`,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            }),
        ],
    })
);

// Cache HTML files (index.html)
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
        cacheName: `html-cache-${CACHE_VERSION}`,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
            }),
        ],
    })
);

// نصب سرویس‌ورکر و precache ابتدایی
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(`static-cache-${CACHE_VERSION}`).then(cache => {
            return cache.addAll([
                '/',          // index.html
            ]);
        })
    );
});
