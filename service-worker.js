const CACHE_NAME = 'pathshala-v1';
const ASSETS = [
  './',
  './index.html',
  './dashboard.html',
  './student-list.html',
  './student-entry.html',
  './payment-tracker.html',
  './batch-control.html'
];

// 📥 ইন্সটল ইভেন্ট - ফাইলগুলো ব্রাউজার ক্যাশ মেমরিতে সেভ করা
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pathshala Assets Caching... 📦');
      return cache.addAll(ASSETS);
    })
  );
});

// ⚡ অ্যাক্টিভেট ইভেন্ট - পুরোনো ক্যাশ মেমরি ডিলিট করা
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 🌐 নেটওয়ার্ক রিকোয়েস্ট হ্যান্ডেল করা (অফলাইন সাপোর্ট ও ফাস্ট লোডিং)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
