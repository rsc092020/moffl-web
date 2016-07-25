angular.module('all').controller('MainCtrl',
    ['$scope', 'MflService', 'LeagueInfo', '$q',
        function ($scope, MflService, LeagueInfo, $q) {
            'use strict';

            refresh();
            $scope.leagueInfo = LeagueInfo;
            $scope.refresh = refresh;
            $scope.changeLeagueYear = changeLeagueYear;

            function changeLeagueYear() {
                LeagueInfo.id($scope.historyItem.id);
                LeagueInfo.year($scope.historyItem.year);
                refresh();
            }

            function refresh() {
                var standingsPromise = MflService.leagueStandings();
                var leaguePromise = MflService.league();

                $q.all([standingsPromise, leaguePromise]).then(function(data) {
                    $scope.league = data[1];
                    $scope.history = _($scope.league.history.league)
                        .map(function(val) {
                            return {
                                id: +val.url.split('/').pop(),
                                year: +val.year
                            };
                        })
                        .orderBy('year', 'desc')
                        .value();
                    $scope.historyItem = _.find($scope.history, {id: LeagueInfo.id()});
                    $scope.standings = _(data[0]).keyBy('id').merge(_.keyBy($scope.league.franchises.franchise, 'id')).toArray().value();
                    LeagueInfo.baseUrl($scope.league.baseURL);
                });
            }
        }
    ]
);