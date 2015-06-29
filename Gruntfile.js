module.exports = function(grunt) {
  
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    
    clean: {
      build: ["demo_docs/build"],
      fonts: ["sphinx_sass_theme/static/fonts"]
    },
    
    // https://github.com/Modernizr/grunt-modernizr
    // npm install grunt-modernizr --save-dev
    modernizr: {
      dist: {
	// [REQUIRED] Path to the build you're using for development.
	devFile: 'bower_components/modernizr/modernizr.js',
	
	// Path to save out the built file.
	outputFile: 'sphinx_sass_theme/static/js/modernizr.js',
	
        // Based on default settings on http://modernizr.com/download/
        "extra" : {
          "shiv" : true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "cssclasses" : true
        },
	
        // Based on default settings on http://modernizr.com/download/
        "extensibility" : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false,
          "cssclassprefix": ""
        },
	
        // By default, source is uglified before saving
        "uglify" : true,
	
        // Define any tests you want to implicitly include.
        "tests" : [],
	
        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        "parseFiles" : true,
	
        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a "files" array below.
	"files" : {
          "src": [
	    'sphinx_sass_theme/static/css/*.css',
	    'sphinx_sass_theme/static/js/*.css'
	  ]
        },
	
        // This handler will be passed an array of all the test names
        // passed to the Modernizr API, and will run after the API
        // call has returned
        // "handler": function (tests) {},
	
        // When parseFiles = true, matchCommunityTests = true will attempt to match user-contributed tests.
        "matchCommunityTests" : false,
	
        // Have custom Modernizr tests? Add paths to their location here.
        "customTests" : []
      }
    },
    
    copy: {
      fonts: {
        files: [{ // includes files within path
	  expand: true,
	  flatten: true,
	  src: ['bower_components/font-awesome/fonts/*'],
	  dest: 'sphinx_sass_theme/static/fonts/',
	  filter: 'isFile'
	}]
      }
    },
    
    sass: {
      dev: {
        options: {
          style: 'expanded',
          loadPath: [
	    'bower_components/bourbon/dist',
	    'bower_components/neat/app/assets/stylesheets',
	    'bower_components/font-awesome/scss',
	    // 'bower_components/wyrm/sass'
	  ]
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.sass'],
          dest: 'sphinx_sass_theme/static/css',
          ext: '.css'
        }]
      },
      build: {
        options: {
          style: 'compressed',
          loadPath: [
	    'bower_components/bourbon/dist',
	    'bower_components/neat/app/assets/stylesheets',
	    'bower_components/font-awesome/scss',
	    // 'bower_components/wyrm/sass'
	  ]
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.sass'],
          dest: 'sphinx_sass_theme/static/css',
          ext: '.css'
        }]
      }
    },
    
    exec: {
      bower_update: {
        cmd: 'bower update'
      },
      build_sphinx: {
        cmd: 'sphinx-build demo_docs/source demo_docs/build'
      }
    },
    
    connect: {
      server: {
        options: {
          port: 1919,
          base: 'demo_docs/build',
          livereload: true
        }
      }
    },
    
    open : {
      dev: {
        path: 'http://localhost:1919'
      }
    },
    
    watch: {
      // Compile sass changes into theme directory
      sass: {
        files: ['sass/*.sass', 'sass/**/*.sass', 'bower_components/**/*.sass'],
        tasks: ['sass:dev']
      },
      // Changes in theme dir rebuild sphinx
      sphinx: {
        files: ['sphinx_sass_theme/**/*', 'demo_docs/**/*.rst', 'demo_docs/**/*.py'],
        tasks: ['clean:build', 'exec:build_sphinx']
      },
      // live-reload the demo_docs if sphinx re-builds
      livereload: {
        files: ['demo_docs/build/**/*'],
        options: { livereload: true }
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks("grunt-modernizr");
  
  grunt.registerTask('fonts', [
    'clean:fonts',
    'copy:fonts'
  ]);
  
  grunt.registerTask('default', [
    // 'exec:bower_update',
    'clean:build',
    // 'modernizr',
    'sass:dev',
    'exec:build_sphinx',
    'connect',
    'open',
    'watch'
  ]);
  
  grunt.registerTask('build', [
    'exec:bower_update',
    'clean:build',
    'modernizr',
    'sass:build',
    'exec:build_sphinx'
  ]);
}
