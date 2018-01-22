"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require ('postcss-scss');
var combineMq = require('gulp-combine-mq');


var autoprefixer = require('autoprefixer');
var paddingBottom = require('./app/postcss-plugin/index.js');

gulp.task('addPaddingBottom', function(){

	var processors = [
		paddingBottom
	];

	return gulp.src('app/workspace/*.scss')
	.pipe(postcss(processors, {syntax: scss}))
	.pipe(gulp.dest('app/intermediary/scss'));

});

gulp.task('sass', ['addPaddingBottom'], function(){

	var processors = [
		autoprefixer
	];

	return gulp
    .src("app/intermediary/*.scss")
    .pipe(sass())
    .pipe(combineMq())
    .pipe(postcss(processors))
    .pipe(gulp.dest("app/output/css"));

});



gulp.task("watch", ['sass'], function() {
  gulp.watch("app/workspace/postcss-scss/content.scss", ["sass"]);
});