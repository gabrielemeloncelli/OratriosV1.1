var gulp = require('gulp');
var rename = require('gulp-rename');

var basePaths = {
  dest: 'C:/Publish/Oratrios'
};
gulp.task('default', function() {
  // index.html
  gulp.src('index-publish.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest(basePaths.dest));
  // web.config
  gulp.src('web.config')
  .pipe(gulp.dest(basePaths.dest))
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