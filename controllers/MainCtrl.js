angular.module('all').controller('MainCtrl',
    ['$scope', 'MflService', 'LeagueInfo',
        function ($scope, MflService, LeagueInfo) {
            'use strict';

            refresh();
            $scope.leagueInfo = LeagueInfo;
            $scope.refresh = refresh;

            function refresh() {
                MflService.getStandings().then(function(data) {
                    $scope.standings = data;
                });
            }
        }
    ]
);