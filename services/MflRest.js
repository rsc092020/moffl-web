angular.module('all').factory('MflRest',
    ['Restangular', 'LeagueInfo',
        function(Restangular, LeagueInfo) {

            'use strict';
            var baseUrl = 'http://www03.myfantasyleague.com/';

            function get() {
                var mflRestangular = Restangular.withConfig(function(RestangularConfigurer) {
                    var url = baseUrl + LeagueInfo.year() +'/export';

                    RestangularConfigurer.setBaseUrl(url);
                });

                return mflRestangular;
            }


            return {
                get: get
            };
        }
    ]
);

