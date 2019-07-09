var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var version = require('gulp-version-number');
var gulpLoadPlugins = require('gulp-load-plugins');
var cacheBuster = require('gulp-cache-bust');
var htmlPartial = require('gulp-html-partial');
var cat  = require('gulp-cat');
const htmlmin = require('gulp-htmlmin');
var smushit = require('gulp-smushit');
var autoprefixerOptions = {
  browsers: ['Firefox < 20', 'ie 8-11', 'iOS 7', 'last 2 Chrome versions']
};


// less compiler
gulp.task('less', function () {
  return gulp.src('./src/css/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      compress: true
    }).on('error', function (err) {
      gutil.log(err);
      this.emit('end');
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./dist/sourcemaps'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});



// js compiler
gulp.task('js', function () {
  gulp.src([
      './src/js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('compiled.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest('./dist/js/'))
});


// // cacheBuster Less
// gulp.task('cacheLess', ['less'], function () {
//   return gulp.src('./dist/index.html')
//     .pipe(cacheBuster({
//       type: 'timestamp'
//     }))
//     .pipe(gulp.dest('./'));
// });


// // cacheBuster JS
// gulp.task('cacheJS', ['js'], function () {
//   return gulp.src('./dist/index.html')
//     .pipe(cacheBuster({
//       type: 'timestamp'
//     }))
//     .pipe(gulp.dest('./'));
// });


// Partial
gulp.task('partial', function () {
  gulp.src(['./src/*.html'])
    .pipe(htmlPartial({
      basePath: './src/partials/'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('image', function () {
  return gulp.src('./src/img/*.{jpg,png}')
      .pipe(smushit())
      .pipe(gulp.dest('./dist/img'));
});



// browser reload
gulp.task('browserSync', function () {
  browserSync.init({
    // proxy: 'sthree-components.local'
    proxy: 'http://localhost:8888/TagTiles/dist'
  })
})



// Watch
gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./src/css/modules/*.less', ['less']);
  gulp.watch('./src/css/*.less', ['less']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/**/*.html', ['partial']);
});



// Default task
gulp.task('default', ['less', 'js', 'partial', 'watch']);