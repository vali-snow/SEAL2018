/*global Route, Router, storeBDinSS*/


function inits() {
    'use strict';
    function initSessionStorage() {
        if (!sessionStorage.db) {
            storeBDinSS();
        }
    }
    initSessionStorage();
    
    
    function initServiceWorker() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js').then(function(swReg) {
                console.log('Service Worker is registered', swReg);
                ServiceWorker = swReg;
            }).catch(function(error) {
                console.error('Service Worker Error', error);
            });
        } else {
            console.warn('Push messaging is not supported');
            pushButton.textContent = 'Push Not Supported';
        }
    }
    initServiceWorker();
    
    function initNotification(){
        var modal = document.getElementById('notificationModal');
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };
        var button = document.getElementById('notificationSave');
        button.onclick = function(){
            var notificationTypes = {
                type1: modal.getElementsByTagName("input")[0].checked,
                type2: modal.getElementsByTagName("input")[1].checked,
                type3: modal.getElementsByTagName("input")[2].checked
            };
            localStorage.setItem('notificationTypes',JSON.stringify(notificationTypes));
            navigator.serviceWorker.controller.postMessage(notificationTypes);
            modal.style.display = "none";
        }
        
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission==='granted'){
                    if (localStorage.getItem('notificationTypes') === null) {
                       modal.style.display = "block";
                    } else {
                        var notificationTypes = JSON.parse(localStorage.getItem('notificationTypes'));
                        navigator.serviceWorker.controller.postMessage(notificationTypes);
                    }
                }
                //localStorage.removeItem('notifications');
            });
        }        
    }
    initNotification();
    
    function initRouter() {
        var router = new Router([
            new Route('main', 'main.html', true),
            new Route('results', 'results.html'),
            new Route('allergy', 'allergy.html'),
            new Route('report', 'report.html')
        ]);
    }
    initRouter();
};
inits();