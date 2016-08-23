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

        LeagueInfo.year(2016);
        LeagueInfo.id(48649);
        LeagueInfo.baseUrl('http://www03.myfantasyleague.com');
    }
]);