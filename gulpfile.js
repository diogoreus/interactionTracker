var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var babelify = require('babelify');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var assign = require('lodash.assign');

// Watchify is an extension for browserify
// that keeps tab on what files are changed
// so that browserify doesn't have to waste
// time on recompiling unchanged files.
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
var customOpts = { debug: true };
var opts = assign({}, watchify.args, customOpts);

// Add a babelify transform to the
// watchify-browserify object. This
// allows us to use ES6 features in our code,
// and also handles JSX -> JS compilation.


// add our entry file to the watchify-browserify
// object. Browserify will pull in the rest our
// app files by traversing imports out from app.js

gulp.task('compile', function() {
	var wb = watchify(browserify(opts));

	wb.transform(babelify.configure({
		experimental: true,
	}));

	wb.add('./src/app.js');

	return wb
    .bundle() // do the actual browerify/babelify compilation
    .on('error', function (err) {
      // If browserify fails at compiling,
      // we want that to be forwarded to the browser,
      // or we'll be confused why nothing has changed.
      fs.createWriteStream("build/app.js")
      .write(
      	'var errStr = "COMPILATION ERROR! '+err.message+'";' +
      	'console.warn(errStr); document.write(errStr)')
      console.warn('Error :', err.message); this.emit('end')
  })
    .pipe(fs.createWriteStream("build/app.js"))
    // write the whole shabang to teh build dir
})

gulp.task('compile-tests', function() {
	var wb = watchify(browserify(opts));

	wb.transform(babelify.configure({
		experimental: true,
	}));

	wb.add('./test/tests.js');

	return wb
    .bundle() // do the actual browerify/babelify compilation
    .on('error', function (err) {
      // If browserify fails at compiling,
      // we want that to be forwarded to the browser,
      // or we'll be confused why nothing has changed.
      fs.createWriteStream("browser/tests.js")
      .write(
      	'var errStr = "COMPILATION ERROR! '+err.message+'";' +
      	'console.warn(errStr); document.write(errStr)')
      console.warn('Error :', err.message); this.emit('end')
  })
    .pipe(fs.createWriteStream("browser/tests.js"))
    // write the whole shabang to teh build dir
})


gulp.task('webserver-serve', ['compile'] ,function() {
	return gulp.src('.')
	.pipe(webserver({
      fallback: 'app.html', // defalt page to serve as root
      port: 80
  }));
});

//serving the main page
gulp.task('webserver-dev', ['compile'] ,function() {
	return gulp.src('.')
	.pipe(webserver({
      fallback: 'app.html', // defalt page to serve as root
      open: true
  }));
});

// Serving the tests in the browser, to teste in the comand lina $npm test
gulp.task('webserver-tests', ['compile'] ,function() {
	return gulp.src('./browser')
	.pipe(webserver({
      fallback: 'index.html', // defalt page to serve as root
      open: true,
      port: 8001
  }));
});

// Task that compiles the app,
// starts a webserver, watches app directory for changes,
// and on change recompiles, and tells livereload to reload.
gulp.task('watch', ['compile'], function () {
	livereload.listen()
	gulp.start('webserver-dev')
	gulp.start('webserver-tests')

	watch(['*.html', 'src/**/*.js'], function () {
		runSequence(['compile'], function() {
			livereload.reload('app.html')
		})
	})

	watch(['test/**/*.js'], function () {
		runSequence(['compile-tests'], function() {
			livereload.reload('browser/index.html')
		})
	})
})

// The default task when running just "gulp"
// is "watch"
gulp.task('default', ['watch']);














