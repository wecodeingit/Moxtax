'use strict';

route.$inject = ['$stateProvider', '$urlRouterProvider'];

function route($stateProvider, $urlRouterProvider) {

    var tmpl = require("./home/home.html");

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            template: tmpl,
        });

}

module.exports = route;
