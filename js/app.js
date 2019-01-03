/*global Route, Router*/


(function () {
    'use strict';
    function initNotification(){
        var data = {
            title: 'Test notification',
            msg: 'Hello world reloaded',
            msger: 'The one and only',
            link: 'https://www.google.ro/'
        }
        
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
            localStorage.setItem("notificationTypes", JSON.stringify(notificationTypes));
            modal.style.display = "none";
        }
        
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission==='granted' && localStorage.getItem('notificationTypes') === null){
                    modal.style.display = "block";
                    
//                    var notification = new Notification(data.title, {
//                        body: data.msg+ "\n" + data.msger,
//                        icon: "/img/notify.png",
//                        timeout: 3000
//                    });
//                    notification.onclick = function(event){
//                        event.preventDefault();
//                        window.open(data.link, '_blank');
//                    }
                }
                localStorage.removeItem('notificationTypes');
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
}());