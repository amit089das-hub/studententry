const CACHE_NAME = 'edumanager-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/student-list.html',
  '/student-entry.html',
  '/payment-tracker.html',
  '/batch-control.html'
];

// ইন্সটল ইভেন্ট - ফাইল ক্যাশ করা
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// নেটওয়ার্ক রিকোয়েস্ট হ্যান্ডেল করা (অফলাইন সাপোর্ট)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
