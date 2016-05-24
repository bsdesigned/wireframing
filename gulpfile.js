// Gulp 3.8 code... differs in 4.0
var gulp = require('gulp'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync');

var reload  = browserSync.reload;

gulp.task('php', function() {
    php.server({ base: 'build', port: 8010, keepalive: true});
});
gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['build/*.php'], [reload]);
});