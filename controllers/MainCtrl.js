angular.module('all').controller('MainCtrl',
    ['$scope', 'MflService', 'LeagueInfo', '$q',
        function ($scope, MflService, LeagueInfo, $q) {
            'use strict';

            var validLeagueUrl = /myfantasyleague\.com\/\d{4}\/.{4}\/\d{5}$/i;

            refresh();
            $scope.leagueInfo = LeagueInfo;
            $scope.refresh = refresh;
            $scope.changeLeagueYear = changeLeagueYear;

            function changeLeagueYear() {
                if($scope.currentHistory) {
                    refresh($scope.currentHistory.id, $scope.currentHistory.year);
                }
            }

            function refresh(leagueId, year) {
                leagueId = leagueId || LeagueInfo.id();
                year = year || LeagueInfo.year();

                var standingsPromise = MflService.leagueStandings(leagueId, year);
                var leaguePromise = MflService.league(leagueId, year);

                $q.all([standingsPromise, leaguePromise])
                    .then(function(data) {
                        $scope.league = data[1];
                        $scope.history = _($scope.league.history.league)
                            .filter(function(val) {
                                return val.url && validLeagueUrl.test(val.url);
                            })
                            .map(function(val) {
                                return {
                                    id: +val.url.split('/').pop(),
                                    year: +val.year
                                };
                            })
                            .orderBy('year', 'desc')
                            .value();
                        $scope.currentHistory = _.find($scope.history, {id: leagueId});
                        $scope.standings = _(data[0]).keyBy('id')
                            .merge(_.keyBy($scope.league.franchises.franchise, 'id'))
                            .toArray()
                            .value();
                        LeagueInfo.id(leagueId);
                        LeagueInfo.year(year);
                        LeagueInfo.baseUrl($scope.league.baseURL);
                    })
                    .catch(function() {
                        // if there's an error reset back to previous history year
                        if($scope.history) {
                            $scope.currentHistory = _.find($scope.history, {id: LeagueInfo.id()});
                        }
                    });
            }
        }
    ]
);