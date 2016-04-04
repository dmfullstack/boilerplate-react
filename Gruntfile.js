exports = module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      client: {
        files: [
          {src: ['client/**/*','!client/**/*.jsx'], dest: '.tmp/'}
        ]
      },
      server: {
        files: [
          {src: 'server/**/*', dest: '.tmp/'},
          {src: 'bin/**/*', dest: '.tmp/'}
        ]
      }
    },
    includeSource: {
      main: {
        options: {
          templates: {
            html: {
              jsx: '<script src="{filePath}"></script>'
            }
          }
        },
        files: {
          'client/index.html': 'client/index.html'
        }
      }
    },
    watch: {
      client: {
        files: ['client/**/*','!client/bower_components/**/*','!client/**/*.jsx'],
        tasks: ['copy:client']
      },
      jsx: {
        files: ['common/**/*.jsx'],
        tasks: ['babel:jsx']
      },
      server: {
        files: ['server/**/*', 'bin/www'],
        tasks: ['copy:server','express:dev'],
        options: {
          spawn: false
        }
      },
      livereload: {
        files: ['.tmp/client/**/*'],
        options: {
          livereload: true
        }
      }
    },
    express: {
      dev: {
        options: {
          script: '.tmp/bin/www',
          port: 9000
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:9000'
      }
    },
    wiredep: {
      main: {
        src: ['client/index.html']
      },
      options: {
        overrides: {
          babel: {
            main: ['browser.min.js']
          }
        }
      }
    },
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['react']
      },
      jsx: {
        files: [
          {expand: true, cwd: 'common/', src: ['**/*.jsx','!bower_components/**/*'], dest: '.tmp/client/common/', ext: '.js'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('serve', ['wiredep','copy','babel','express:dev','open:dev','watch']);
};