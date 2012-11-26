/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      app: {
        src:['js/app.js', 'js/sprite.js', 'js/services.js', 'js/directives.js', 'js/controllers.js'],
        dest: 'dist/js/sh2.js'
      },
      libs: {
        src:['lib/jquery-1.8.2.min.js', 'lib/jquery-ui-1.9.1.custom.min.js', 'lib/bootstrap/js/bootstrap.min.js', 'lib/angular.min.js', 'lib/angular-ui.min.js', 'lib/jquery.layout-latest.min.js'],
        dest: 'dist/js/libs.js'
      }
    },

    cssmin: {
      app: {
        src: ['css/sh2.css'],
        dest: 'dist/css/sh2.css'
      },
      libs: {
        src: ['lib/bootstrap/css/bootstrap.min.css', 'lib/jquery-ui-1.9.1.custom.min.css', 'lib/layout-default-latest.css', 'css/sh2.css'],
        dest: 'dist/css/libs.css'
      }
    },

    copy: {
      dist: {
        files: {
          "dist/images/": "images/**",
          "dist/img/": "lib/bootstrap/img/**",
          "dist/views/": "views/**"
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