self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('qr-code-generator-cache').then((cache) => {
        return cache.addAll([
          '/',
          'index.html',
          'styles.css',
          'script.js',
          'qrcode.min.js',
          'preview.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  