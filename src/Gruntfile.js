// Generated on 2014-11-06 using generator-durandal 0.1.5
'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var options = {
        dev: grunt.option('dev'),
        platform: grunt.option('platform')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: {
            app: 'app',
            css: 'css',
            js: 'js',
            assets: 'assets',
            build: '../build',
            cordova: '../cordova/www',
            temp: '.temp',
            test: 'test/spec'
        },

        // Build durandal application into a single file
        durandal: {
            release: {
                src: [
                    'app/**/*.*',
                    'bower_components/durandal/js/**/*.*',
                    'bower_components/promise-ext/dist/promise-almond.js',
                    'bower_components/promise-ext/dist/promise/*.*'
                ]
            },
            cordova: {
                src: '<%= durandal.release.src %>',
                options: {
                    out: '<%= paths.cordova %>/<%= paths.js %>/app.js',

                    uglify2: {
                        compress: {
                            global_defs: {
                                DEBUG: false,
                                CORDOVA: true,
                                WIN8: false
                            }
                        },
                    }
                }
            },
            win8: {
                src: '<%= durandal.release.src %>',
                options: {
                    out: '<%= paths.cordova %>/../merges/windows/<%= paths.js %>/app.js',

                    uglify2: {
                        compress: {
                            global_defs: {
                                DEBUG: false,
                                CORDOVA: true,
                                WIN8: true
                            }
                        },
                    }
                }
            },
            options: {
                name: '../bower_components/durandal-almond/almond',
                baseUrl: '<%= paths.app %>/',
                mainPath: '<%= paths.app %>/main.js',
                out: '<%= paths.build %>/<%= paths.js %>/app.js',

                paths: {
                    'text': '../bower_components/requirejs-text/text',
                    'css': '../bower_components/require-css/css',
                    'css-builder': '../bower_components/require-css/css-builder',
                    'normalize': '../bower_components/require-css/normalize',
                    'durandal': '../bower_components/durandal/js',
                    'plugins': '../bower_components/durandal/js/plugins',
                    'transitions': '../bower_components/durandal/js/transitions',
                    'knockout': '../bower_components/knockout.js/knockout',
                    'jquery': '../bower_components/jquery/dist/jquery',
                    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
                    'modernizr': '../bower_components/modernizr/modernizr',
                    'promise': '../bower_components/promise-ext/dist/promise',
                    'promise-almond': '../bower_components/promise-ext/dist/promise-almond',
                    'math': '../bower_components/geomath/dist/math',
                    'prism': '../bower_components/prismjs/prism'
                },

                shim: {
                    bootstrap: {
                        deps: ['jquery'],
                        exports: 'jQuery'
                    },
                    modernizr: {
                        exports: 'Modernizr'
                    },
                    prism: {
                        exports: 'Prism'
                    }
                },

                uglify2: {
                    compress: {
                        global_defs: {
                            DEBUG: false,
                            CORDOVA: false,
                            WIN8: false
                        }
                    },
                }
            }
        },

        // Build less files into css ones
        less: {
            options: {
                paths: ['bower_components/bootstrap/less/']
            },
            release: {
                options: {
                    cleancss: true
                },
                files: [
                    {
                        src: '<%= paths.css %>/app.less',
                        dest: '<%= paths.build %>/<%= paths.css %>/app.css'
                    },
                    {
                        src: 'bower_components/bootstrap/less/bootstrap.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/bootstrap.css'
                    },
                    {
                        src: 'bower_components/font-awesome/less/font-awesome.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/font-awesome.css'
                    }
                ]
            },
            cordova: {
                options: {
                    cleancss: true
                },
                files: [
                    {
                        src: '<%= paths.css %>/app.less',
                        dest: '<%= paths.cordova %>/<%= paths.css %>/app.css'
                    },
                    {
                        src: 'bower_components/bootstrap/less/bootstrap.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/bootstrap.css'
                    },
                    {
                        src: 'bower_components/font-awesome/less/font-awesome.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/font-awesome.css'
                    }
                ]
            },
            watch: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.css %>/',
                        src: '*.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/',
                        ext: '.css'
                    },
                    {
                        src: 'bower_components/bootstrap/less/bootstrap.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/bootstrap.css'
                    },
                    {
                        src: 'bower_components/font-awesome/less/font-awesome.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/font-awesome.css'
                    }
                ]
            }
        },

        // Build HTML File by transforming every development source to production ones
        htmlbuild: {
            release: {
                src: 'index.html',
                dest: '<%= paths.build %>/',
                options: {
                    scripts: {
                        libs: '<%= paths.build %>/<%= paths.js %>/libs.js',
                        app: '<%= paths.build %>/<%= paths.js %>/app.js'
                    },
                    styles: {
                        libs: '<%= paths.build %>/<%= paths.css %>/libs.css',
                        app: '<%= paths.build %>/<%= paths.css %>/app.css'
                    }
                }
            },
            cordova: {
                src: 'index.html',
                dest: '<%= paths.cordova %>/',
                relative: false,
                prefix: "/",
                options: {
                    scripts: {
                        libs: [
                            '<%= paths.cordova %>/cordova.js',
                            '<%= paths.cordova %>/<%= paths.js %>/libs.js'
                        ],
                        app: '<%= paths.cordova %>/<%= paths.js %>/app.js'
                    },
                    styles: {
                        libs: '<%= paths.cordova %>/<%= paths.css %>/libs.css',
                        app: [
                            '<%= paths.cordova %>/<%= paths.css %>/app.css',
                            '<%= paths.cordova %>/<%= paths.css %>/platform.css'
                        ]
                    }
                }
            }
        },

        // Creates empty files for htmlbuild and for merges
        touch: {
            cordova: [
                '<%= paths.cordova %>/cordova.js',
                '<%= paths.cordova %>/<%= paths.css %>/platform.css'
            ]
        },

        // Concatenate files to reduce requests count
        concat: {
            scripts: {
                src: [
                    'bower_components/json2/json2.js'
                ],
                dest: '<%= paths.build %>/<%= paths.js %>/libs.js'
            },
            styles: {
                src: [
                    '<%= paths.temp %>/<%= paths.css %>/bootstrap.css',
                    '<%= paths.temp %>/<%= paths.css %>/font-awesome.css',
                    'bower_components/durandal/css/durandal.css'
                ],
                dest: '<%= paths.build %>/<%= paths.css %>/libs.css'
            },
            'cordova-scripts': {
                src: '<%= concat.scripts.src %>',
                dest: '<%= paths.cordova %>/<%= paths.js %>/libs.js'
            },
            'cordova-styles': {
                src: '<%= concat.styles.src %>',
                dest: '<%= paths.cordova %>/<%= paths.css %>/libs.css'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            watch: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.temp %>/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.temp %>/'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        dest: '<%= paths.build %>',
                        src: [
                            '*.{ico,png,txt,appcache,manifest}',
                            '.htaccess',
                            '<%= paths.assets %>/**/*.*',
                            '!<%= paths.assets %>/**/*.{gif,jpeg,jpg,png,svg}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.build %>'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.build %>/'
                    }
                ]
            },
            cordova: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        dest: '<%= paths.cordova %>',
                        src: [
                            '*.{ico,png,txt,appcache,manifest}',
                            '.htaccess',
                            '<%= paths.assets %>/**/*.*',
                            '!<%= paths.assets %>/**/*.{gif,jpeg,jpg,png,svg}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.cordova %>'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.cordova %>/'
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= paths.css %>/',
                dest: '<%= paths.temp %>/<%= paths.css %>/',
                src: '*.css'
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.build %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.build %>/<%= paths.css %>/'
                }]
            },
            cordova: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.cordova %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.cordova %>/<%= paths.css %>/'
                }]
            },
            watch: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.temp %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.temp %>/<%= paths.css %>/'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= paths.build %>/<%= paths.assets %>/'
                }]
            },
            cordova: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= paths.cordova %>/<%= paths.assets %>'
                }]
            }
        },
        svgmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>',
                    src: '*.svg',
                    dest: '<%= paths.build %>/<%= paths.assets %>/'
                }]
            },
            cordova: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>',
                    src: '*.svg',
                    dest: '<%= paths.cordova %>/<%= paths.assets %>/'
                }]
            }
        },
        htmlmin: {
            options: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            },
            release: {
                src: '<%= paths.build %>/index.html',
                dest: '<%= paths.build %>/index.html'
            },
            cordova: {
                src: '<%= paths.cordova %>/index.html',
                dest: '<%= paths.cordova %>/index.html'
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= paths.app %>/**/*.js',
                '<%= paths.test %>/spec/*.js'
            ]
        },

        // Test your code with jasmine
        mocha: {
            test: ["<%= paths.test %>/index.html"]
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= paths.app %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            test: {
                files: ['<%= paths.test %>/spec/*.js'],
                tasks: ['connect:test', 'jasmine']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },

            less: {
                files: [
                    '<%= paths.css %>/*.less',
                    'bower_components/bootstrap/less/*.less',
                    'bower_components/font-awesome/font-awesome.less',
                ],
                tasks: ['less:watch', 'autoprefixer:watch']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.app %>/**/*.*',
                    '<%= paths.temp %>/<%= paths.css %>/*.css',
                    '<%= paths.assets %>/**/*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= paths.temp %>/',
                        './'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '<%= paths.temp %>/',
                        '<%= paths.test %>/',
                        './'
                    ]
                }
            },
            release: {
                options: {
                    open: true,
                    base: '<%= paths.build %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            release: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.temp %>/',
                        '<%= paths.build %>/*',
                        '!<%= paths.build %>/.git*'
                    ]
                }]
            },
            cordova: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.temp %>/',
                        '<%= paths.cordova %>/*',
                        '!<%= paths.cordova %>/.git*'
                    ]
                }]
            },
            server: '<%= paths.temp %>/'
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:watch',
                'copy:watch'
            ],
            release: [
                'durandal:release',
                'less:release',
                'copy:release',
                'imagemin:release',
                'svgmin:release'
            ],
            cordova: [
                'durandal:cordova',
                'less:cordova',
                'copy:cordova',
                'imagemin:cordova',
                'svgmin:cordova',
                'touch:cordova'
            ]
        },

        // Automate cordova commands
        cordovacli: {
            prepare: {
                options: {
                    command: 'prepare',
                    platforms: ['windows', 'wp8', 'android'],
                    path: '<%= paths.cordova %>/../'
                }
            }
        }
    });

    grunt.registerTask('test', ['clean:server', 'copy:styles', 'autoprefixer:watch', 'connect:test', 'mocha']);
    grunt.registerTask('build-browser', ['clean:release', 'concurrent:release', 'concat:scripts', 'concat:styles', 'autoprefixer:release', 'htmlbuild:release', 'htmlmin:release']);
    grunt.registerTask('build-cordova', ['clean:cordova', 'concurrent:cordova', 'durandal:win8', 'concat:cordova-scripts', 'concat:cordova-styles', 'autoprefixer:cordova', 'htmlbuild:cordova', 'htmlmin:cordova', 'cordovacli:prepare']);
    grunt.registerTask('build', ['build-browser', 'build-cordova']);

    grunt.registerTask('default', ['newer:jshint', 'test', 'build']);

    grunt.registerTask('serve', ['clean:server', 'concurrent:server', 'autoprefixer:watch', 'connect:livereload', 'watch']);
    grunt.registerTask('serve-build', ['build-browser', 'connect:release:keepalive']);
};