const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

// Define paths
const scssFiles = ['./scss/**/*.scss'];
const exampleCssFiles = ['./example/elements/*.scss'];
const mixinsCssFiles = ['./mixins/**/*.scss'];

// Compile SCSS files
function compileScss(sourceFiles, destination) {
  return gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('main.css')) // Concatenate all SCSS files into main.css
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
}

function watch() {
  gulp.watch(scssFiles, gulp.series(compileMainScss));
  gulp.watch(exampleCssFiles, gulp.series(compileMainScss));
  gulp.watch(mixinsCssFiles, gulp.series(compileMainScss));
}

// Compile SCSS files
function compileMainScss() {
  return compileScss(scssFiles.concat(exampleCssFiles).concat(mixinsCssFiles), './css/');
}

const build = gulp.series(compileMainScss);
const defaultTask = gulp.series(build, watch);
exports.default = defaultTask;
