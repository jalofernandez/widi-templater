/*
 * Dependencies
 */
   var gulp = require('gulp'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
   cleanCSS = require('gulp-clean-css'),
   imagemin = require('gulp-imagemin'),
gulpIgnore  = require('gulp-ignore'),
       less = require('gulp-less'),
       path = require('path'),
       data = require('gulp-data'),
         fs = require('fs'),
    sitemap = require('gulp-sitemap');

/*
 * Task 'deploy' configuration: last step just before publish (compile all files & prepare to push it all!)
 */
// gulp.task('deploy', ['js', 'img', 'less', 'css', 'mincss', 'pug', 'sitemap']); // task order is not random

/*
 * Task 'dev' configuration: developer mode
 */
gulp.task('dev', ['less', 'img', 'css', 'sitemap', 'mincss']); // task order is not random

/*
 * Task call 1: to compile LESS files into CSS ones! (with new DEV path)
 * Task 'less' configuration --> gulp-less (gulp less)
 */
gulp.task('less', function () {
    return gulp.src('./less/**/[^_]*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./css/default'));
});

/*
 * Task call 2: to minify CSS files! (with new DEV path)
 * Task 'css' configuration --> gulp-clean-css (gulp css)
 */
gulp.task('css', function() {
  return gulp.src('./css/default/custom.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css/sources'));
});

/*
 * Task call 3: to concat all minified CSS files into a single one! (with final PRO path)
 * Task 'minify-css' configuration --> mincss (gulp mincss)
 */
gulp.task('mincss', function () {
    gulp.src('./css/sources/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'))
});

/*
 * Task 'img' configuration --> gulp-imagemin (gulp img)
 */
gulp.task('img', function () {
    return gulp.src(['img/**/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

/*
 * Task 'sitemap' configuration --> gulp-sitemap (gulp sitemap)
 */
gulp.task('sitemap', function () {
    gulp.src('dist/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'https://widitrade.com',
            changefreq: 'weekly',
            priority: '1.0'
        }))
        .pipe(gulp.dest('./dist'));
});
