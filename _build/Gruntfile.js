module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            basePath: '../',
            srcPath: '../src/',
            deployPath: '../deploy/',
            examplePath: '../examples/',
            filmPath: '../../src/scripts/'
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

        // Task configuration.
        concat: {
            options: {
                separator: '',
                stripBanners: true
            },
            dist: {
                files: {
                    '<%= meta.examplePath %>SinglePageWebsite/styles/styles.min.css': [
                        '<%= meta.examplePath %>SinglePageWebsite/styles/gallery.css',
                        '<%= meta.examplePath %>SinglePageWebsite/styles/shadows.css',
                        '<%= meta.examplePath %>SinglePageWebsite/styles/buttons.css',
                        '<%= meta.examplePath %>SinglePageWebsite/styles/style.css'
                    ]
                }
            }
        },

        cssmin: {
            compress: {
                files: {
                    '<%= meta.examplePath %>SinglePageWebsite/styles/styles.min.css': [
//                        '<%= meta.srcPath %>styles/gallery.css',
//                        '<%= meta.srcPath %>styles/shadows.css',
//                        '<%= meta.srcPath %>styles/buttons.css',
//                        '<%= meta.srcPath %>styles/style.css',
                        '<%= meta.examplePath %>SinglePageWebsite/styles/dellistore.css'
                    ]
                }
            }
        },

        ts: {
            base: {
                src: ['<%= meta.examplePath %>SinglePageWebsite/src/**/*.ts']
            }
        },

        type: {
            website: {
                src: ['<%= meta.examplePath %>SinglePageWebsite/src/WebsiteBootstrap.ts'],
                dest: '<%= meta.examplePath %>SinglePageWebsite/scripts/app.js',
                options: {
                    target: 'es3', //or es5
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            },
            todo: {
                src: ['<%= meta.examplePath %>ParseTodoApp/src/TodoBootstrap.ts'],
                dest: '<%= meta.examplePath %>ParseTodoApp/scripts/todo.js',
                options: {
                    target: 'es3', //or es3
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            },
            film: {
                src: ['<%= meta.examplePath %>WindowFilm/dev/WindowFilmBootstrap.ts'],
                dest: '<%= meta.examplePath %>WindowFilm/prod/film.js',
                options: {
                    target: 'es3', //or es3
                    base_path: '',
                    sourcemap: false,
                    declaration: false
                }
            }
        },

        jst: {
            compile: {
                options: {
                    //namespace: "templates",                 //Default: 'JST'
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
                    "<%= meta.examplePath %>SinglePageWebsite/scripts/templates.js": ["<%= meta.examplePath %>SinglePageWebsite/templates/*.tpl"]
                }
            }
        },

        replace: {
            dist: {
                options: {
                    variables: {
                        'timestamp': '<%= grunt.template.today() %>',
                        'version': '<%= pkg.version %>'
                    }
                },
                files: [
                    {expand: true, flatten: true, src: ['<%= meta.srcPath %>offline/offline.manifest'], dest: '<%= meta.deployPath %>offline/'}
                ]
            }
        },

        clean: {
            options: {
                force: false
            },
            build: {
                src: ['<%= meta.deployPath %>templates.js']
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    '<%= meta.deployPath %>scripts/app.min.js': [
                                                                    '<%= meta.deployPath %>templates.js',
                                                                    '<%= meta.deployPath %>scripts/app.min.js'
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
                    paths: '<%= meta.srcPath %>' + 'typescript/',
                    outdir: '<%= meta.basePath %>' + 'docs/'
                }
            }
        },

        watch: {
            website: {
                files: [
                    '<%= meta.examplePath %>SinglePageWebsite/src/**/*.ts',
                    '<%= meta.examplePath %>SinglePageWebsite/styles/**/*.css',
                    '<%= meta.basePath %>**/*.tpl',
                    '<%= meta.examplePath %>SinglePageWebsite/index.html'
                ],
                tasks: ['website'],
                options: {
                    nospawn: false
                }
            },
            todo: {
                files: [
                    '<%= meta.basePath %>**/*.ts',
                ],
                tasks: ['todo'],
                options: {
                    nospawn: false
                }
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-type');

    // Default task.
    grunt.registerTask('default', ['cssmin', 'type:website', 'jst']);
    grunt.registerTask('website', ['type:website']);
    grunt.registerTask('todo', ['type:todo']);
    grunt.registerTask('film', ['type:film']);

};
