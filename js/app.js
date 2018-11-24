/*global Route, Router */


(function () {
    'use strict';
    function init() {
        var router = new Router([
            new Route('main', 'main.html', true),
            new Route('results', 'results.html'),
            new Route('allergy', 'allergy.html'),
            new Route('report', 'report.html')
        ]);
    }
    init();
}());