module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // This will load in our package.json file so we can have access
        // to the project name and version number.
        pkg: grunt.file.readJSON('package.json'),


        // Constants for the Gruntfile so we can easily change the path for
        // our environments.
        BASE_PATH: '../',
        DEVELOPMENT_PATH: '../dev/',
        PRODUCTION_PATH: '../prod/',
        EXAMPLE_PATH: '../examples/',
        WINDOW_FILM_PATH: '../../../deploy/scripts/',
        SRC_PATH: '../src/',
        DEPLOY_PATH: '../deploy/',


        // A code block that will be added to all our minified code files.
        // Gets the name and version from the above loaded 'package.json' file.
        // To use: '<%= banner.join("\\n") %>'
        banner: [
            '/*',
            '* Project: <%= pkg.name %>',
            '* Version: <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
            '* Development By: <%= pkg.developedBy %>',
            '* Copyright(c): <%= grunt.template.today("yyyy") %>',
            '*/'
        ],


        // Task configuration.
        concat: {
//            main: {
//                options: {
//                    separator: '',
//                    stripBanners: true
//                },
//                dist: {
//                    files: {
//                        '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/styles.min.css': [
//                            '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/gallery.css',
//                            '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/shadows.css',
//                            '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/buttons.css',
//                            '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/style.css'
//                        ]
//                    }
//                }
//            },
//            film: {
                options: {
                    separator: '\n',
                    stripBanners: true
                },
                dist: {
                    files: {
                        '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/filmapp.js': [
                            '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/json.js',
                            '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/templates.js',
                            '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/typescript.js'
                        ]
                    }
                }
//            }
        },

        cssmin: {
            compress: {
                files: {
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/styles.min.css': [
//                        '<%= SRC_PATH %>styles/gallery.css',
//                        '<%= SRC_PATH %>styles/shadows.css',
//                        '<%= SRC_PATH %>styles/buttons.css',
//                        '<%= SRC_PATH %>styles/style.css',
                        '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/dellistore.css'
                    ]
                }
            }
        },

        typescript: {
            website: {
                src: ['<%= EXAMPLE_PATH %>SinglePageWebsite/src/WebsiteApp.ts'],
                dest: '<%= EXAMPLE_PATH %>SinglePageWebsite/scripts/app.js',
                options: {
                    target: 'es3', //or es5
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            },
            todo: {
                src: ['<%= EXAMPLE_PATH %>ParseTodoApp/src/TodoApp.ts'],
                dest: '<%= EXAMPLE_PATH %>ParseTodoApp/scripts/todo.js',
                options: {
                    target: 'es3', //or es3
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            },
            film: {
                src: ['<%= EXAMPLE_PATH %>WindowFilm/dev/WindowFilmApp.ts'],
                dest: '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/typescript.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            },
            gallery: {
                src: ['<%= EXAMPLE_PATH %>PhotoGalleryApp/dev/PhotoGalleryApp.ts'],
                dest: '<%= EXAMPLE_PATH %>PhotoGalleryApp/prod/scripts/photoGalleryApp.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            }
        },

        jst: {
            compile: {
                options: {
                    namespace: "TEMPLATES",                 //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                        //interpolate : /\{\{(.+?)\}\}/g    //Mustache Syntax
                    },
                    processName: function(filename) {
                        //Shortens the file path for the template.
                        return filename.slice(filename.indexOf("template"), filename.length);
                    }
                },
                files: {
                    "<%= EXAMPLE_PATH %>SinglePageWebsite/scripts/templates.js": ["<%= EXAMPLE_PATH %>SinglePageWebsite/templates/**/*.tpl"]
                }
            },
            film: {
                options: {
                    namespace: "TEMPLATES",                 //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                        //interpolate : /\{\{(.+?)\}\}/g    //Mustache Syntax
                    },
                    processName: function(filename) {
                        //Shortens the file path for the template.
                        return filename.slice(filename.indexOf("template"), filename.length);
                    }
                },
                files: {
                    "<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/templates.js": ["<%= EXAMPLE_PATH %>WindowFilm/dev/templates/**/*.tpl"]
                }
            }
        },

        clean: {
            options: {
                force: false
            },
            build: {
                src: ['<%= DEPLOY_PATH %>templates.js']
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    '<%= DEPLOY_PATH %>scripts/app.min.js': [
                                                                    '<%= DEPLOY_PATH %>templates.js',
                                                                    '<%= DEPLOY_PATH %>scripts/app.min.js'
                                                                ]
                }
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.ts',
                    paths: '<%= SRC_PATH %>' + 'com/',
                    outdir: '<%= BASE_PATH %>' + 'docs/'
                }
            }
        },

        json: {
            film: {
                options: {
                    namespace: 'JSON_DATA'
                },
                src: ['<%= EXAMPLE_PATH %>WindowFilm/dev/data/**/*.json'],
                dest: '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/json.js'
            }
        },

        watch: {
            website: {
                files: [
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/src/**/*.ts',
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/styles/**/*.css',
                    '<%= BASE_PATH %>**/*.tpl',
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/index.html'
                ],
                tasks: ['website']
            },
            todo: {
                files: [
                    '<%= BASE_PATH %>**/*.ts',
                ],
                tasks: ['todo']
            },
            film: {
                files: [
                    '<%= EXAMPLE_PATH %>WindowFilm/dev/**/*.ts'
                ],
                tasks: ['film']
            },
            temp: {
                files: [
                    '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/typescript.js'
                ],
                tasks: ['temp']
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-json');

    // Default task.
    grunt.registerTask('default', ['cssmin', 'typescript:website', 'jst']);
    grunt.registerTask('website', ['typescript:website']);
    grunt.registerTask('todo', ['typescript:todo']);
    grunt.registerTask('filmprod', ['typescript:film', 'jst:film', 'json:film', 'concat']);
    grunt.registerTask('film', ['typescript:film', 'concat']);
    grunt.registerTask('gallery', ['typescript:gallery']);
    grunt.registerTask('temp', ['concat']);
    grunt.registerTask('all', ['website', 'todo', 'film']);

};
