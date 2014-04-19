module.exports = function (grunt) {

    // Project config
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

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};