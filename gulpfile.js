// Gulp 3.8 code... differs in 4.0
var gulp = require('gulp'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    ip = require("ip"),
    clean = require("gulp-clean"),
    util = require("gulp-util");

// GET YOUR IPADDRESS
var myIP = ip.address();

// PORTNUMBERS
var portNo1 = 8010
var portNo2 = 8080

// BOOTSTRAP RELOAD
var reload  = browserSync.reload;

// MOVE JS, CSS + PHP FILES
var filesToMove = [
    './resources/js/*.js',
    './resources/css/*.css',
    './resources/**/*.php'
];

// PHP SERVER
gulp.task('php', function() {
    php.server({ base: 'build', hostname: myIP, port: portNo1, keepalive: true});
});

// BROWSER SYNC
gulp.task('browser-sync', ['php'], function() {
    browserSync({
        proxy: myIP + ':' + portNo1,
        port: portNo2,
        open: true,
        notify: true
    });
});


// C:EAN FILES/FOLDERS
gulp.task('clean', function(){
  return gulp.src(['build/*'], {read:false})
  .pipe(clean());
});

// MOVE FILES
gulp.task('move', ['clean'], function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest('build'));
});

// IMAGEMIN
gulp.task('imagemin', function () {
    gulp.src('./resources/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

gulp.task('default', ['move', 'imagemin', 'browser-sync'], function () {
    gulp.watch(['resources/*.php'], [reload]);
});