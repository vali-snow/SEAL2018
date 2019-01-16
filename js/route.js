/*global console*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }]*/

function Route(name, htmlName, defaultRoute) {
    'use strict';
    try {
        if (!(name && htmlName)) {
            throw 'error: name and htmlName params are mandatory';
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    defaultRoute: undefined,
    constructor: function (name, htmlName, defaultRoute) {
        'use strict';
        this.name = name;
        this.htmlName = htmlName;
        this.defaultRoute = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        'use strict';
        return hashedPath.replace('#', '') === this.name;
    }
};