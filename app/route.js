'use strict';

route.$inject = ['$stateProvider', '$urlRouterProvider'];

require('./demo');
var demoTmpl = require("./demo/demo.html");

require('./home');
require('./header');

function route($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('demo', {
            url: '/demo',
            template: demoTmpl,
        })
        .state('home', {
            url: '/home',
            template: '<home-component></home-component>',
        });
}

module.exports = route;
