var gulp = require('gulp');

gulp.task('default', function() {
  // javascript
  gulp.src('dist/*.js')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  // favicon
  gulp.src('dist/*.ico')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  // glyphicons
  gulp.src('dist/*.woff2')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  gulp.src('dist/*.svg')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  gulp.src('dist/*.ttf')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  gulp.src('dist/*.eot')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  gulp.src('dist/*.woff')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api'));
  // assets
  gulp.src('dist/assets/**/*.*')
  .pipe(gulp.dest('C:/Collection 2016/Oratrios/v1.1/Test/Oratrios.Api/assets'));

});