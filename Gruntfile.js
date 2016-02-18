module.exports = function(grunt) {
  var destination = 'build',
      //Temp
      baseTmp       = 'src/tmp',
      tmpJs         = baseTmp+'/*.js',
      tmpConcat     = baseTmp+'/concat.js',
      //JS
      baseJs        = 'src/js',
      srcJs         = baseJs+'/**/*.js',
      srcSpecs      = baseJs+'/**/*.spec.js',
      minJs         = destination+'/assets/core.js',
      //Sass
      baseSass      = 'src/sass',
      srcSass       = baseSass+'/base.scss',
      minSass       = destination+'/assets/core.css',
      //Templates
      baseTemplates = 'src/templates',
      //Tests
      baseTests     = 'test',
      testBuild     = baseTests+'/build.conf.js',
      //Compiler options
      compilerPath = 'node_modules/google-closure-compiler',
      compilation_level = 'SIMPLE_OPTIMIZATIONS',
      language_in = 'ECMASCRIPT6_STRICT',
      language_out = 'ECMASCRIPT5_STRICT',
      copyright_text = 'Copyright David Sundelius 2016',
      timestamp = grunt.template.today("yyyy-mm-dd HH:MM:ss");

  grunt.initConfig({
    sass: {
      build: {
        files: {
          minSass : srcSass
        }
      }
    },

    concat: {
      compile: {
        src: [tmpJs, srcJs, '!'+srcSpecs],
        dest: tmpConcat
      },
      nominify: {
        src: [tmpJs, srcJs, '!'+srcSpecs],
        dest: minJs
      }
    },

    karma: {
      options: {
        runnerPort: 9999,
        logLevel: 'ERROR',
        client: {
          captureConsole: false
        }
      },
      build: {
        configFile: testBuild,
        singleRun: true,
      }
    },

    jshint: {
      options: {
	      jshintrc: true
      },
      build: [srcJs]
    },

    copy: {
      copyClosureCompilerJar: {
        src: 'node_modules/google-closure-compiler/compiler.jar',
        dest: 'node_modules/google-closure-compiler/build/compiler.jar',
        filter: 'isFile'
      },
      deployTemplates: {
        expand: true,
        cwd: baseTemplates,
        src: ['**/*.html'],
        dest: destination + '/'
      }
    },

    clean: [destination]
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('js',        ['concat:nominify']);
  grunt.registerTask('css',       ['clean']);
  grunt.registerTask('templates', ['copy:deployTemplates']);
  grunt.registerTask('test',      ['jshint:build']);
  grunt.registerTask('build',     ['test', 'clean', 'css', 'templates', 'js']);
  grunt.registerTask('default',   ['build']);
};
