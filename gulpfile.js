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
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const  replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');


const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');


const paths = {
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
        dest: 'dist/images/',
    },
    fonts: {
        src: 'src/fonts/**/*.woff',
        dest: 'dist/fonts/',
    }

};

//scss
function styles() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemap.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}


//pug
function templates() {
    return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.root));
}

function clear() {
    return del(paths.root);
}

function images() {
    return gulp.src('./src/images/**/*.{jpg,png}')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 3,
    }))
    .pipe(gulp.dest(paths.images.dest));
}

 function svg() {
   return gulp.src('./src/images/**/*.svg') 
        .pipe(gulp.dest('dist/images'))
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}



function server() {
    browserSync.init({
        server: paths.root,
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload); 
}

function scripts() {
    return gulp.src('./src/js/main.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}


exports.styles = styles;
exports.templates = templates;
exports.images = images;
exports.fonts = fonts;
exports.clear = clear;
exports.svg = svg;



gulp.task('default', gulp.series(
    clear, svg,
    gulp.parallel(styles, templates, images, fonts, scripts),
    gulp.parallel(watch, server)
));

