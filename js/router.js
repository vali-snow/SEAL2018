/*global console, document, window, XMLHttpRequest, sessionStorage, storeBDinSS, restoreDBfromSSasJSON*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }]*/
/*eslint-env es6*/

function loadData(htmlName, parameter) {
    'use strict';
    if (!sessionStorage.db) {
        storeBDinSS();
    }
    var db = restoreDBfromSSasJSON();
    
    switch (htmlName) {
    case 'main.html':
        let first6 = db.slice(0,6);
        let newsBox = document.getElementById("newsBox");
        for (let i in first6) {
            let ta = document.createTextNode(first6[i].name);
            let a = document.createElement("A");
            a.setAttribute('href', '#allergy?'+first6[i].id);
            a.appendChild(ta);
            let h2 = document.createElement("H2");
            h2.appendChild(a);
            let tp = document.createTextNode(first6[i].description);
            let p = document.createElement("P");
            p.appendChild(tp);
            let div = document.createElement("DIV");
            div.appendChild(h2)
            div.appendChild(p);
            newsBox.appendChild(div);
        }
        break;
    case 'results.html':
        let results = document.getElementById("results");
        let selection;
        if (parameter == undefined || parameter == "") {
            selection = db;
        } else {
            selection = db.filter(a => a.name.includes(parameter) || a.description.includes(parameter));
        }
        for (let i in selection) {
            let ta = document.createTextNode(selection[i].name);
            let a = document.createElement("A");
            a.setAttribute('href', '#allergy?'+selection[i].id);
            a.appendChild(ta);
            let h2 = document.createElement("H2");
            h2.appendChild(a);
            let tp = document.createTextNode(selection[i].description);
            let p = document.createElement("P");
            p.appendChild(tp);
            let div = document.createElement("DIV");
            div.appendChild(h2)
            div.appendChild(p);
            results.appendChild(div);
        }
        break;
    case 'allergy.html':
        let allergy = db.filter(a => a.id == parameter)[0];
        let headerBox = document.getElementById("headerBox");
        let tspan = document.createTextNode(allergy.name);
        let span = document.createElement("SPAN");
        span.appendChild(tspan);
        span.setAttribute('class', 'highlight');
        let h2 = document.createElement("H2");
        h2.appendChild(span);
        h2.setAttribute('class', 'boxLeft');
        headerBox.appendChild(h2);
        let th2 = document.createTextNode("Statistics");
        h2 = document.createElement("H2");
        h2.appendChild(th2);
        h2.setAttribute('class', 'boxRight');
        headerBox.appendChild(h2);

        let boxLeft = document.querySelector('#infoBox .boxLeft');

        let th3 = document.createTextNode("What is " + allergy.name + "?");
        let h3 = document.createElement("H3");
        h3.appendChild(th3);
        let tp = document.createTextNode(db[parameter].description);
        let p = document.createElement("P");
        p.appendChild(tp);
        let div = document.createElement("DIV");
        div.appendChild(h3);
        div.appendChild(p);
        boxLeft.appendChild(div);

        th3 = document.createTextNode("Symptoms:");
        h3 = document.createElement("H3");
        h3.appendChild(th3);
        tp = document.createTextNode(allergy.symptoms.join(', '));
        p = document.createElement("P");
        p.appendChild(tp);
        div = document.createElement("DIV");
        div.appendChild(h3);
        div.appendChild(p);
        boxLeft.appendChild(div);

        th3 = document.createTextNode("Prevention:");
        h3 = document.createElement("H3");
        h3.appendChild(th3);
        tp = document.createTextNode(allergy.prevention);
        p = document.createElement("P");
        p.appendChild(tp);
        div = document.createElement("DIV");
        div.appendChild(h3);
        div.appendChild(p);
        boxLeft.appendChild(div);

        th3 = document.createTextNode("Treatment:");
        h3 = document.createElement("H3");
        h3.appendChild(th3);
        tp = document.createTextNode(allergy.treatment);
        p = document.createElement("P");
        p.appendChild(tp);
        div = document.createElement("DIV");
        div.appendChild(h3);
        div.appendChild(p);
        boxLeft.appendChild(div);

        th3 = document.createTextNode("Medication:");
        h3 = document.createElement("H3");
        h3.appendChild(th3);
        tp = document.createTextNode(allergy.medication.join(', '));
        p = document.createElement("P");
        p.appendChild(tp);
        div = document.createElement("DIV");
        div.appendChild(h3);
        div.appendChild(p);
        boxLeft.appendChild(div);

        break;
    default:
    }
}

function Router(routes) {
    'use strict';
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        'use strict';
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        'use strict';
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function () {
                scope.hasChanged(scope, r);
            });
        }(this, r));
        this.hasChanged(this, r);
    },
    hasChanged: function (scope, r) {
        'use strict';
        var i, route, length;
        if (window.location.hash.length > 0) {
            for (i = 0, length = r.length; i < length; i += 1) {
                route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1).split('?')[0])) {
                    let parameter = window.location.hash.substr(1).split('?')[1];
                    if (parameter == undefined) {
                        parameter = window.document.activeElement.parentElement.firstElementChild.value;
                    }
                    scope.goToRoute(route.htmlName, parameter);
                }
            }
        } else {
            for (i = 0, length = r.length; i < length; i += 1) {
                route = r[i];
                if (route.defaultRoute) {
                    scope.goToRoute(route.htmlName, undefined);
                }
            }
        }
    },
    goToRoute: function (htmlName, parameter) {
        'use strict';
        (function (scope) {
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    loadData(htmlName, parameter);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        }(this));
    }
};