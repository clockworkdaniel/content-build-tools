"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var wait = require('gulp-wait');
var scss = require ('postcss-scss');
var combineMq = require('gulp-combine-mq');


var autoprefixer = require('autoprefixer');
var paddingBottom = require('postcss-ri-padding-bottom');

gulp.task('addPaddingBottom', function(){

	var processors = [
		paddingBottom
	];

	return gulp.src('app/postcss-scss/*.scss')
	.pipe(postcss(processors, {syntax: scss}))
	.pipe(gulp.dest('app/scss'));

});

gulp.task('sass', ['addPaddingBottom'], function(){

	var processors = [
		autoprefixer
	];

	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(combineMq())
	.pipe(postcss(processors))
	.pipe(gulp.dest('app/css'));

});



gulp.task("watch", ['sass'], function() {
  gulp.watch("app/postcss-scss/content.scss", ['sass']);
});