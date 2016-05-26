// Basic Gulp File
//
var gulp = require('gulp'),
    bower = require('gulp-bower')
    sass = require('gulp-sass')
    notify = require('gulp-notify')
    concat = require('gulp-concat')
    scsslint = require('gulp-scss-lint')
    browserSync = require('browser-sync').create()
    php = require('gulp-connect-php')
    ip = require('ip')
    flatten = require('gulp-flatten')
    imagemin = require('gulp-imagemin')
    clean = require("gulp-clean")
    utils = require("gulp-util")
    importCss = require('gulp-import-css')
    cssmin = require('gulp-cssmin')
    rename = require('gulp-rename');

// GET YOUR IP AND HOLD IT
var whatip = ip.address();

// SET DEV IPs
var port1 = 8015;
var port2 = 8085;

// RELOAD BROWSER
var reload  = browserSync.reload;

var config = {
    projectName: 'Wireframe',
    sassPath: './resources/sass',
    templatePath: './resources/templates',
    cssPath: './build/css',
    moduleCSSPath: './resources/css',
    htmlPath: './resources/html',
    imagePath: './resources/images',
    rootPath: './resources',
    jsPath: './resources/js',
    bowerDir: './bower_components',
    spectreDir: '.bower_components/spectre.css',
}

var filesToMove = [
    config.rootPath + '/**/*.php',
    config.imagePath + '/**/*.*',
    config.jsPath + '/*.js',
    config.moduleCSSPath + '/*.min.css'
];


// BOWER
gulp.task('bower', function() {

    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

// MODULE CSS
gulp.task('moduleCSS', function() {
    gulp.src(config.moduleCSSPath + '/modules.css')
    .pipe(importCss())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.moduleCSSPath));
});

// IMAGEMIN
gulp.task('imagemin', function () {
    gulp.src('./resources/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

//FONTAWESOME
gulp.task('icons', function() {
    gulp.src([config.bowerDir + '/font-awesome/fonts/**.*'])
        .pipe(gulp.dest('./build/fonts'));
    gulp.src([config.bowerDir + '/spectre.css/demo/font/fonts/**.*'])
        .pipe(gulp.dest('./build/fonts'));
});

//SCSSLINT
gulp.task('scssLint', ['sassCompile'], function() {
    return gulp.src(config.sassPath + '/**/*.scss')
    .pipe(scsslint());
});

//JS Flatten
gulp.task('jsFlatten', function() {
    gulp.src([
            'bower_components/**/*.min.js'
            ], {base: './'})
      .pipe(flatten())
      .pipe(gulp.dest(config.jsPath));
});

//GULP-SASS
gulp.task('sassCompile', function() {

    return gulp.src(config.sassPath + '/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('moveFiles', function() {

    gulp.src(filesToMove, { base: './resources' })
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true}));
});

//PHP
gulp.task('php', function() {
    php.server({ base: './build', hostname:whatip, port: port1, keepalive: true});
});

// CLEAN FOLDERS
gulp.task('clean', function(){
    return gulp.src(['./build/*'], {read:false})
    .pipe(clean());
});


//BROWSER SYNC
gulp.task('browserSync',['php'], function() {
     browserSync.init({
        proxy: whatip + ':' + port1,
        port: port2,
        open: true,
        notify: true
    });
});


//GULP SERVE
gulp.task('serve', ['bower', 'jsFlatten', 'icons', 'imagemin', 'scssLint', 'moduleCSS', 'moveFiles', 'browserSync'], function() {
    //DO WE NEED WATCHES HERE?

        gulp.watch(config.rootPath + "/**/*.php", ['moveFiles']);
        gulp.watch(config.sassPath + "/**/*.scss", ['scssLint', 'sassCompile']);
        gulp.watch(config.jsPath + "/**/*.js", ['moveFiles']);
        gulp.watch(config.rootPath + "/**/*.html", ['moveFiles']);
        gulp.watch(config.imagePath + "/**/*.*", ['imagemin']);
});