angular.module('all').controller('MainCtrl',
    ['$scope', 'MflService', 'LeagueInfo', '$q',
        function ($scope, MflService, LeagueInfo, $q) {
            'use strict';

            refresh();
            $scope.leagueInfo = LeagueInfo;
            $scope.refresh = refresh;

            function refresh() {
                var standingsPromise = MflService.getStandings();
                var leaguePromise = MflService.getLeague();

                $q.all([standingsPromise, leaguePromise]).then(function(data) {
                    $scope.league = data[1];
                    $scope.league.year = LeagueInfo.year();
                    $scope.standings = _(data[0]).keyBy('id').merge(_.keyBy($scope.league.franchises.franchise, 'id')).toArray().value();
                    LeagueInfo.baseUrl($scope.league.baseURL);
                });
            }
        }
    ]
);