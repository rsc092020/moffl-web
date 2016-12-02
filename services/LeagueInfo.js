angular.module('all').factory('LeagueInfo',
    ['$cacheFactory',
        function($cacheFactory) {
            'use strict';
            //usage :
            // LeagueInfo.id() get
            // LeagueInfo.id(newId) set
            // LeagueInfo.year() get
            // LeagueInfo.year(newYear) set

            var leagueInfoCache = $cacheFactory('LeagueInfo');

            function putOrGet(key, val) {
                return val ? leagueInfoCache.put(key, val) : leagueInfoCache.get(key);
            }

            var keys = ['id', 'year', 'baseUrl'];

            var service = _(keys)
                .keyBy()
                .mapValues(function(val) {
                    return _.partial(putOrGet, val);
                })
                .value()

            return service;
        }
    ]
);