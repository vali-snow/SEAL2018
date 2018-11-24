/*global console, document, window, XMLHttpRequest */
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

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
        (function (scope) {
            window.addEventListener('hashchange', function (r) {
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
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (i = 0, length = r.length; i < length; i += 1) {
                route = r[i];
                if (route.defaultHtml) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        'use strict';
        (function (scope) {
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.inreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        }(this));
    }
};