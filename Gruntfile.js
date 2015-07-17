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
                    'build/app.min.js': ['node_modules/jquery/dist/jquery.js', 'amaze.js', 'maze.js', 'maze_solver.js', 'app.js']
                }
            },
            exercise: {
                files: {
                    'exercise/app.min.js': ['node_modules/jquery/dist/jquery.js', 'amaze.js', 'maze.js', 'app.js']
                }
            }
        },

        processhtml: {
            options: {
                // Task-specific options go here.
            },
            app: {
                files: {'build/index.html': ['index.html']}
            },
            exercise: {
                files: {'exercise/index.html': ['index.html']}
            }
        },

        copy: {
            exercisejs: {
                src: 'maze_solver_exercise.js',
                dest: 'exercise/maze_solver_exercise.js'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('app',['uglify:app','processhtml:app']);
    grunt.registerTask('exercise',['uglify:exercise','processhtml:exercise','copy:exercisejs']);

    grunt.registerTask('default', ['app','exercise']);
};
