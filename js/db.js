/*global document, XMLHttpRequest, sessionStorage*/
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }]*/

function readTextFile(file, callback) {
    "use strict";
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function storeBDinSS() {
    "use strict";
    readTextFile("/db/db.json", function (text) {
        sessionStorage.db = text;
    });
}

function restoreDBfromSSasJSON() {
    "use strict";
    return JSON.parse(sessionStorage.db);
}