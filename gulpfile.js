var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('compile', function () {
  return browserify({
    entries: ['./app/es6/main.js']
  })
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer()) 
    .pipe(uglify()) 
    .pipe(gulp.dest('./app/scripts'))
})

gulp.task('watch', function() {
  gulp.watch('./app/es6/**/*.js', ['compile'])
})