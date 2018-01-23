"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require ('postcss-scss');
var combineMq = require('gulp-combine-mq');

var autoprefixer = require('autoprefixer');
var paddingBottom = require('./app/postcss-plugin/index.js');

var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

gulp.task('addPaddingBottom', function(){

	var processors = [
		paddingBottom
	];

	return gulp.src('app/workspace/*.scss')
		.pipe(postcss(processors, {syntax: scss}))
		.pipe(gulp.dest('app/intermediary'));

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
		.pipe(gulp.dest("app/output"));

});

gulp.task('lint', function(){
	return gulp.src('app/workspace/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('babel', function(){

	return gulp.src('app/workspace/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('app/output'));

});



gulp.task("watch", ['sass', 'babel'], function() {
	gulp.watch("app/workspace/*.scss", ["sass"]);
	gulp.watch("app/workspace/*.js", ["babel"]);
});