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
            });
    }
]);

angular.module('all').run(['LeagueInfo',
    function(LeagueInfo) {
        //current year:
        //LeagueInfo.year(new Date().getFullYear());

        LeagueInfo.year(2015);
        LeagueInfo.id(35465);
        LeagueInfo.baseUrl('http://www03.myfantasyleague.com');
    }
]);