module.exports = function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider)

{
    'use strict';

    $locationProvider.hashPrefix('!');

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    //Global HTTP error handler
    var interceptor = ['$q', '$injector', function($q, $injector) {
        function showMessage(text) {
            console.log("error");
        }
        return {
            responseError: function(error) {
                showMessage('Network Error');
                return $q.reject(error);
            }
        };

    }];

    $httpProvider.interceptors.push(interceptor);

};
