var app = angular.module('myApp', []);

app.constant('ngAuthSettings', {
    apiServiceBaseUri: "http://portal1.qlc.org.qa/API/LMSClient/api/",
    localStorageAuthkey: "AuthorizationUserTempClient"
});

app.factory('authInterceptorService', ['ngAuthSettings',
    function (ngAuthSettings) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            var authData = localStorage.getItem(ngAuthSettings.localStorageAuthkey);
            
            if (authData) {
                authData = JSON.parse(authData);
                console.log(authData);
                config.headers.Authorization = 'Bearer ' + authData.access_token;
            }

            config.headers['Accept-Language'] = 'ar-QA';

            return config;
        };

        authInterceptorServiceFactory.request = _request;
        return authInterceptorServiceFactory;
    }]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.directive('ngEnter', function () {
    return {
        restrict: "A",
        scope: {
            action: "&ngEnter"
        },
        link: function (scope, element, attrs) {
            element.on("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(scope.action);
                    event.preventDefault();
                }
            });
        }
    };
});

app.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
});