module.exports = function(grunt){
    'use strict';

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 7777,
                    base: '',
                    keepalive: true
                }
            }
        }
    });
};
