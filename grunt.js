/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      app: {
        src:['js/app.js',
             'js/model/sprite.js',
             'js/services/settings.js',
             'js/services/sprites.js',
             'js/directives/css.js',
             'js/directives/file.js',
             'js/directives/generator.js',
             'js/directives/grid.js',
             'js/directives/image.js',
             'js/directives/layout.js',
             'js/directives/sprite.js',
             'js/controllers/app.js',
             'js/controllers/data.js',
             'js/controllers/image.js',
             'js/controllers/settings.js'],
        dest: 'dist/js/sh2.js'
      },
      libs: {
        src:['lib/jquery-ui-1.9.1.custom.min.js',
             'lib/bootstrap/js/bootstrap.min.js',
             'lib/angular-ui.min.js',
             'lib/jquery.layout-latest.min.js',
             'lib/highlight.min.js'],
        dest: 'dist/js/libs.js'
      }
    },

    cssmin: {
      app: {
        src: ['css/sh2.css'],
        dest: 'dist/css/sh2.css'
      },
      libs: {
        src: ['lib/bootstrap/css/bootstrap.min.css', 'lib/jquery-ui-1.9.1.custom.min.css', 'lib/layout-default-latest.css', 'lib/github.css', 'css/sh2.css'],
        dest: 'dist/css/libs.css'
      }
    },

    copy: {
      dist: {
        files: {
          "dist/images/": "images/**",
          "dist/img/": "lib/bootstrap/img/**",
          "dist/views/": "views/**",
          "dist/lib/head.load.min.js": "lib/head.load.min.js"
        }
      }
    },

    targethtml: {
      dist: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-targethtml');

  // Default task.
  grunt.registerTask('default', 'concat copy cssmin targethtml');
};