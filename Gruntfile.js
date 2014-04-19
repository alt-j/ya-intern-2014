module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: [
                    'src/API.js',
                    'src/utils/*.js',
                    'src/transports/partial/*.js',
                    'src/transports/*.js'
                ],
                dest: 'dist/api.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/api.js',
                dest: 'dist/api.min.js'
            }
        },
        watch: {
            files: 'src/**/*.js',
            tasks: 'default'
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};