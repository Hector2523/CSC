const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    '../fonts/Halyard/Halyard_Display_Bold.otf',
    '../styles/variables.css', // Certifique-se de que este arquivo existe
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

let errorOccurred = false;
let errorMessage = '';

function logError(message, error) {
    console.warn('Error: ' + message + ' - ' + error);
    errorOccurred = true;
    errorMessage = message + ' - ' + error;
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'ERROR', message: errorMessage });
        });
    });
}

function sendProgressUpdate(progress) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'PROGRESS', progress: progress });
        });
    });
}

self.addEventListener('install', function(event) {
    if (errorOccurred) return;
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            let totalFiles = urlsToCache.length;
            let filesCached = 0;

            function getFileName(url) {
                return url.split('/').pop();
            }

            function addToCache(url) {
                if (errorOccurred) return Promise.reject('Error occurred, stopping caching');
                return cache.add(url).then(function() {
                    filesCached++;
                    let progress = (filesCached / totalFiles) * 100;
                    console.log(`Caching: ${getFileName(url)} (${progress.toFixed()}%)`);
                    sendProgressUpdate(progress.toFixed());
                }).catch(function(err) {
                    let response = `Failed to cache ${getFileName(url)}`;
                    console.error(response);
                    logError(response, err);
                    return Promise.reject(err);
                });
            }

            // Cache all the files
            let cachePromises = urlsToCache.map(addToCache);
            return Promise.all(cachePromises);
        }).then(function() {
            return self.skipWaiting();
        }).catch(function(err) {
            let response = `Failed to complete the cache installation`;
            console.error(response);
            logError(response, err);
        })
    );
});

self.addEventListener('activate', function(event) {
    if (errorOccurred) return;
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        }).then(function() {
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'CACHE_UPDATED' });
                });
            });
        }).then(function() {
            console.log('Service Worker activated and clients claimed');
        }).catch(function(err) {
            let response = `Failed to activate Service Worker`;
            console.error(response);
            logError(response, err);
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (errorOccurred) {
        event.respondWith(
            new Response('An error occurred while fetching the resource. Please try again later.', {
                status: 500,
                statusText: 'Internal Server Error'
            })
        );
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }

            return fetch(event.request).then(function(response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    console.error('Failed to fetch from network and no cache match found:', event.request.url);
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache).catch(function(err) {
                        let response = `Failed to put ${event.request.url} in cache`;
                        console.error(response);
                        logError(response, err);
                    });
                });

                return response;
            }).catch(function(err) {
                console.error('Fetch failed:', err, 'for request:', event.request.url);

                return new Response('An error occurred while fetching the resource. Please try again later.', {
                    status: 500,
                    statusText: 'Internal Server Error'
                });
            });
        }).catch(function(err) {
            console.error('Match failed:', err, 'for request:', event.request.url);

            return new Response('An error occurred while fetching the resource. Please try again later.', {
                status: 500,
                statusText: 'Internal Server Error'
            });
        })
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'CACHE_STATUS') {
        if (errorOccurred) {
            event.source.postMessage({ type: 'ERROR', message: errorMessage });
        } else {
            event.source.postMessage({ type: 'CACHE_COMPLETE' });
        }
    }
});
