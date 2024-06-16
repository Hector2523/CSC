const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '../fonts/Halyard/fonnts.com-Halyard_Display_Bold.otf',

    '../styles/variables.css',
    '../styles/home.css',
    '../styles/description.css',
    '../styles/carousel.css',
    '../styles/header.css',
    '../styles/menu.css',
    '../styles/load.css',

    '../index.html',

    '../img/banner.webp',
    '../img/fachada.webp',
    '../img/fachadaDois.webp',
    '../img/icon.webp',
    '../img/logo-colegio-juizdefora-nolocal.webp',
    '../img/logo-colegio-juizdefora.webp',
    '../img/logo-rede-bc-banner.webp',
    '../img/logo-rede-bc.webp',

    'main.js',
    'scroll.js',
    'sections.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
                    .catch(function (error) {
                        console.error('Failed to cache:', error);
                    });
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache)
                                    .catch(function (error) {
                                        console.error('Failed to put in cache:', error);
                                    });
                            });

                        return response;
                    }
                ).catch(function (error) {
                    console.error('Fetch failed:', error);
                });
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
