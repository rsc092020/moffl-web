angular.module('all').factory('MflRest',
    ['Restangular', 'LeagueInfo',
        function(Restangular, LeagueInfo) {
            'use strict';

            return {
                get: get
            };

            function get(leagueYear) {
                var mflRestangular = Restangular.withConfig(function(RestangularConfigurer) {
                    // allow urls with multiple // back to back for proxy url to look right
                    RestangularConfigurer.urlCreatorFactory.path.prototype.normalizeUrl = function (url){
                        var parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
                        return (typeof parts[1] !== 'undefined')? parts[1] + parts[2] : parts[2];
                    };

                    // cors-anywhere.herokuapp.com
                    // http://cors-proxy.htmldriven.com/?url=
                    // https://crossorigin.me/
                    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                    var mflUrl = LeagueInfo.baseUrl() + '/' + (leagueYear || LeagueInfo.year()) +'/export';

                    var url = proxyUrl + mflUrl;

                    RestangularConfigurer.setBaseUrl(url);
                });

                return mflRestangular;
            }
        }
    ]
);

