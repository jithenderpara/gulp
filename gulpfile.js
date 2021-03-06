﻿// Dependencies
var gulp = require('gulp');
//To minify script
var uglify = require("gulp-uglify");
//var imagemin = require('imagemin');
//To optimaze images
var imagemin = require('gulp-imagemin')
//marge all Js files into one file
var concat = require('gulp-concat')
//Node server Reload
server = require('gulp-develop-server');
livereload = require('gulp-livereload');

/* top level functions
gulp.task   -- Define tasks
gulp.src    --Point tofiles to use
gulp.dest   --point to filder to output
gulp.watch  -- watch files and folders for changes
*/

// Logs message

gulp.task("message", function () {
    return console.log("Gulp is runing..")
})
//files to watch changes
var serverFiles = [
    './app.js',
    './middleware.js',
    'models/*.js',
    'services/*.js'
];
////Default task is running here
// If server scripts change, restart the server and then livereload. 
gulp.task('default', ['server:start'], function () {
    gulp.watch(serverFiles).on('change', restart);
});
gulp.task('Mongotask', function (cb) {
    var spawn = require('child_process').spawn,
ls = spawn('cmd.exe', ['/c', 'mongoServer.bat']);
    ls.stdout.on('data', function (data) {
        console.log('MongoDB server is running');
        //console.log('stdout: ' + data);
    });
    //ls.stderr.on('data', function (data) {
    //    console.log('stderr: ' + data);
    //});
    ls.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
})
//gulp.task('server:start', function () {

//    server.listen(options, livereload.listen);
//});


gulp.task('server:start', function () {
    server.listen({ path: './app.js' });
});
//to compress images
gulp.task("imageMin", function () {
    gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))

})
//To make minify adding uglify
gulp.task("minify", function () {
    gulp.src("public/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))

})
//marge all js files into one file
gulp.task("concat", function () {
    gulp.src("public/js/*.js")
    .pipe(concat("main.js"))
        //To make minify adding uglify
        .pipe(uglify())
    .pipe(gulp.dest("dist/js"))

})
//gulp watch
gulp.task("watch", function () {
    //here public/js/*.js is watch file location
    //concat is a task which is we created
    gulp.watch("public/js/*.js", ['concat'])

})

function restart(file) {
    server.changed(function (error) {
        console.log("----------")
        if (!error) livereload.changed(file.path);
    });
}
