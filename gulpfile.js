const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const sourcemap = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');


const path = {
    root: './dist',
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },

    templates: {
        src: 'src/pug/**/*.pug',
        dest: 'dist'
    },

    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },

    images: {
        src: 'src/images/**/*.*',
        dest: 'dist/images/'
    }
}

//scss
function styles() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemap.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.styles.dest))
}

//pug
function templates() {
    return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.root));
}

function clear() {
    return del(path.root);
}

function images() {
    return gulp.src('./src/images/**/*.{jpg,png}')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5
    }))
    .pipe(gulp.dest(path.images.dest));
}

function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*, browserSync.reload'); 
}

function scripts() {
    return gulp.src('./src/js/main.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(path.scripts.dest));
}

function watch() {
    gulp.watch(paths.scss.src, styles);
    gulp.watch(paths.pug.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.js.src, scripts);
}


exports.styles = styles;
exports.templates = templates;
exports.images = images;
exports.clear = clear;
exports.scripts = scripts;

gulp.task('default', gulp.series(
    clear,
    gulp.parallel(styles, templates, images, scripts),
    gulp.parallel(watch, server)
));
