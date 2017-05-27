// Dependencies
var gulp = require('gulp');
//To minify script
var uglify = require("gulp-uglify");
//var imagemin = require('imagemin');
//To optimaze images
var imagemin = require('gulp-imagemin')
//marge all Js files into one file
var concat = require('gulp-concat')

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
//Default task is running here
gulp.task("default", ["message"], function () {
    return console.log("Gulp is runing..")
})
gulp.task("imageMin", function () {
    gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))

})
gulp.task("minify", function () {
    gulp.src("public/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))

})
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

