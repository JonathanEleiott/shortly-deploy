module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: '\n'
      },
      dist: {
        // the files to concatenate
        src: 'public/client/*.js',
        // the location of the resulting JS file
        dest: 'public/dist/build.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/build.min.js': 'public/dist/build.js'
        }
      }
    },
    
    clean: ['public/dist'],


    eslint: {
      target: [
        'public/client/*.js'
      ]
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/output.min.css': ['public/*.css']
        } 
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');

  
  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon' ]);
    console.log('server-dev success');
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  //cant prove beyond a reasonable doubt that watch is running
  grunt.registerTask('build', [
    'eslint', 'test', 'watch'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      console.log('prod');
      // add your production server task here
    } else {
      console.log('not prod');
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'test', 'eslint', 'clean'
  ]);

};
