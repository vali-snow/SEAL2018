'use strict';

// {
//    "title": "Test notification",
//    "msg": "Hello world reloaded",
//    "type": "type1",
//    "link": "http://127.0.0.1:64135/index.html#allergy?4"
// }

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

var notificationTypes;

self.addEventListener('notificationclick', function(event) {
    switch(event.action){
        case 'open_url':
            clients.openWindow(event.notification.data.url); //which we got from above
            break;
        default:
            clients.openWindow("www.google.com");
    }
}
, false);

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log('[Service Worker] Push had this data: "${event.data.text()}"');
    var data = JSON.parse(event.data.text());
    
    if(notificationTypes[data.type]){
        var title = data.title;
        var options = {
            body: data.msg,
            icon: "./img/notify.png",
            actions: [{action: "open_url", title: "Read Now"}],
            data: { url:data.link }
        };
        event.waitUntil(self.registration.showNotification(title, options));
    }    
});

//PAGE -> SW
self.addEventListener('message', function(event) { 
  notificationTypes = event.data;
});