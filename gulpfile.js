const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

// Define paths
const scssFiles = ['./scss/**/*.scss'];
const exampleCssFiles = ['./example/**/*.scss'];
const mixinsCssFiles = ['./mixins/**/*.scss'];

// Compile SCSS files
function compileScss(sourceFiles, destination) {
  return gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
}

// Compile SCSS in the main folder
function compileMainScss() {
  return compileScss(scssFiles, './css/');
}

// Compile SCSS in the example folder
function compileExampleScss() {
  return compileScss(exampleCssFiles, './css/');
}

// Compile SCSS in the mixins folder
function compileMixinsScss() {
  return compileScss(mixinsCssFiles, './css/');
}

// Watch for changes in SCSS files
function watch() {
  gulp.watch(scssFiles, compileMainScss);
  gulp.watch(exampleCssFiles, compileExampleScss);
  gulp.watch(mixinsCssFiles, compileMixinsScss);
}

// Define build task
const build = gulp.series(gulp.parallel(compileMainScss, compileExampleScss, compileMixinsScss), watch);

// Export tasks
exports.default = build;
