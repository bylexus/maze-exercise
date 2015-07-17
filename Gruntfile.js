/* jshint undef: false */
module.exports = function(grunt) {
    // ==========================================================================
    // Project configuration.
    // ==========================================================================
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            app: {
              files: {
                'build/app.min.js': ['node_modules/jquery/dist/jquery.js','amaze.js','maze.js','maze_solver.js','app.js']
              }
            }
          }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};
