/*global console, document, window, XMLHttpRequest, sessionStorage, storeBDinSS, restoreDBfromSSasJSON*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }]*/
/*eslint-env es6*/

function redirectToSearch(){
    'use strict';
    document.getElementById("searchform").action = "#results?"+document.getElementById("searchform").getElementsByTagName("input")[0].value;
    document.getElementById("searchform").submit();
}

function loadData(htmlName, parameter) {
    'use strict';
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
        history.pushState("","","index.html#results");
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
        let graphValues = allergy.statistics['affected'];
        let canvas = document.getElementById("barChart");
        let ctx = canvas.getContext('2d');
        let width = 80;
        let X = 130;
        let years = allergy.statistics['years'];
        
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(20,355);
        ctx.lineTo(500, 355);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(80,35);
        ctx.lineTo(80, 390);
        ctx.stroke();
        for (var i = 0; i < graphValues.length; i++){
            var h = graphValues[i];
            if(h < 100){
//                ctx.fillStyle = "#e8491d";
//                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
                var grd = ctx.createLinearGradient(0, 0, 0, 540);
                grd.addColorStop(0, "#006d0c");
                grd.addColorStop(1, "#edffef");
                ctx.fillStyle = grd;
                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
            }
            else if(h >= 100 && h< 200){
//                ctx.fillStyle = "#e8491d";
//                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
                var grd = ctx.createLinearGradient(0, 0, 0, 540);
                grd.addColorStop(0, "orange");
                grd.addColorStop(1, "lightyellow");
                ctx.fillStyle = grd;
                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
            }
            else {
//                ctx.fillStyle = "#e8491d";
//                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
                var grd = ctx.createLinearGradient(0, 0, 0, 540);
                grd.addColorStop(0, "red");
                grd.addColorStop(1, "darkorange");
                ctx.fillStyle = grd;
                ctx.fillRect(X,canvas.height - h - 65, width, h+10);
            }
            
            
            ctx.font = "italic 18px fantasy";
            ctx.fillStyle = "#000";
            ctx.fillText(graphValues[i], X+22, canvas.height - h - 67);
            ctx.font = "italic 25px monospace";
            ctx.fillText(years[i], X + 14, canvas.height -22);
            ctx.font = "italic 20px Times New Roman";
            ctx.fillText("Years", 510, canvas.height - 42);
            ctx.font = "italic 20px Times New Roman";
            ctx.fillText("Affected", 45, 25);
            X += width + 15;

            }

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
                    let parameter = window.document.activeElement.parentElement.firstElementChild.value;
                    if (parameter == undefined) {
                        parameter = window.location.hash.substr(1).split('?')[1];
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