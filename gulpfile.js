const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs-extra');
const urlAdjuster = require('gulp-css-url-adjuster');

const compass = require('gulp-compass');
const path = require('path');


// Compile ma sass for me and autoprefix it
gulp.task('sass', function(){
  return gulp.src('./sass/*.sass')
  .pipe(sass({
    includePaths: [
      'node_modules/govuk_frontend_toolkit/stylesheets', // 1
      'node_modules/govuk-elements-sass/public/sass'     // 2
    ]
  }).on('error', sass.logError))
  // And autoprefix it too
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(urlAdjuster({
    prepend: 'images/',
  }))
  .pipe(gulp.dest('./public/'))
})

gulp.task('default', function(){

  // Watch & compile sass
  gulp.start('sass');
  gulp.watch('./sass/*.sass', ['sass']);

  // Copy static assets from GOV.UK template
  fs.copy('./node_modules/govuk_template_ejs/assets', './public', function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Template assets copied successfully.");
    }
  });

  // Copy assets for SimpleMDE editor
  fs.copy('./node_modules/simplemde/dist/', './public', function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("SimpleMDE CSS copied successfully.");
    }
  });

})
