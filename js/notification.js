
function notifyMe() {
    "use strict";
    var data = {
        msg: "Hello world reloaded",
        msger: "The one and only"
    }
  // check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

//Check for permissions
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Test notification", {
            body: data.msg+ "\n" + data.msger,
            icon: "/img/notify.png",
            timeout: 3000
        });
        notification.onclick = function(event){
            event.preventDefault();
            window.open("https://www.google.ro/", "_blank");
            
        }
      }
    });
  }

}