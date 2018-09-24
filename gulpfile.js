var gulp = require('gulp');

var basePaths = {
  dest: 'C:/Publish/Oratrios'
};
gulp.task('default', function() {
  // javascript
  gulp.src('dist/*.js')
  .pipe(gulp.dest(basePaths.dest));
  // favicon
  gulp.src('dist/*.ico')
  .pipe(gulp.dest(basePaths.dest));
  // glyphicons
  gulp.src('dist/*.woff2')
  .pipe(gulp.dest(basePaths.dest));
  gulp.src('dist/*.svg')
  .pipe(gulp.dest(basePaths.dest));
  gulp.src('dist/*.ttf')
  .pipe(gulp.dest(basePaths.dest));
  gulp.src('dist/*.eot')
  .pipe(gulp.dest(basePaths.dest));
  gulp.src('dist/*.woff')
  .pipe(gulp.dest(basePaths.dest));
  // assets
  gulp.src('dist/assets/**/*.*')
  .pipe(gulp.dest(basePaths.dest));

});