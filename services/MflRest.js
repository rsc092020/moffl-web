angular.module('all').factory('MflRest',
    ['Restangular', 'LeagueInfo',
        function(Restangular, LeagueInfo) {
            'use strict';

            return {
                get: get
            };

            function get(leagueYear) {
                var mflRestangular = Restangular.withConfig(function(RestangularConfigurer) {
                    var url = LeagueInfo.baseUrl() + '/' + (leagueYear || LeagueInfo.year()) +'/export';

                    RestangularConfigurer.setBaseUrl(url);
                });

                return mflRestangular;
            }
        }
    ]
);

