angular.module('all', ['ui.router', 'restangular']);


angular.module('all').config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('detail', {
                url: '/detail',
                templateUrl: 'views/detail.html',
                controller: 'DetailCtrl'
            });
    }
]);

angular.module('all').run(['LeagueInfo',
    function(LeagueInfo) {
        //default to current year
        LeagueInfo.year(new Date().getFullYear());
        LeagueInfo.id(35465);
    }
]);