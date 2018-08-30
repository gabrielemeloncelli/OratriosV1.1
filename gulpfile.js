var gulp = require('gulp');

gulp.task('default', function() {
  // javascript
  gulp.src('dist/*.js')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  // favicon
  gulp.src('dist/*.ico')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  // glyphicons
  gulp.src('dist/*.woff2')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  gulp.src('dist/*.svg')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  gulp.src('dist/*.ttf')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  gulp.src('dist/*.eot')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  gulp.src('dist/*.woff')
  .pipe(gulp.dest('C:/KendoTestPublish'));
  // assets
  gulp.src('dist/assets/**/*.*')
  .pipe(gulp.dest('C:/KendoTestPublish/assets'));

});