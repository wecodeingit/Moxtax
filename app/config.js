'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');

    //Global HTTP error handler
    var interceptor = ['$q', '$injector', function($q, $injector) {
        return {
            responseError: function(error) {
                console.log('Network Error');
                return $q.reject(error);
            }
        };

    }];

    $httpProvider.interceptors.push(interceptor);

}

module.exports = config;
