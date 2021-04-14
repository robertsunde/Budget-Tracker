
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



self.addEventListener('fetch', (event) => {
if(event.request.url.includes("/api/")) {
event.respondWith(
caches.open(dbcacheName).then(cache => {
return fetch(event.request).then((response) => {
    return cache.put(event.request, response.clone()).then(() => {
      return response;
    }).catch(err => {
return cache.match(err)

    });
  }).catch(err => 
console.log(err));

})

)
return 
}
event.respondWith(
fetch(event.request).catch(() => {

return caches.match(event.request).then(response => {

if (response){
    return response
}else if (event.request.headers.get("accept").then("text/html"))


{
    return cache.match("/")
}




})



})


)



  })

