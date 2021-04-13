const cacheData = [
"/",
"/Budget-Tracker/Develop/public/db.js",
"/Budget-Tracker/Develop/public/index.html",
"/Budget-Tracker/Develop/public/index.js",
"/Budget-Tracker/Develop/public/service-worker.js",
"/Budget-Tracker/Develop/public/styles.css"

]


const cacheName = "cache-version1";
const dbcacheName = "dbcache-version1";


self.addEventListener('installation', (event) => {
    event.waitUntil(
      caches
        .open(cacheName)
        .then((cache)=>{  return cache.addAll(cacheData)

        }  
            )
        .then(self.skipWaiting())
    );
  });
