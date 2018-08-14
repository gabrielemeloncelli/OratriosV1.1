var gulp = require('gulp');

gulp.task('default', function() {
  // javascript
  gulp.src(['./**', '!./gulp*.js', '!./node_modules', '!./node_modules/**', '!./dist', '!./dist/**'])
  .pipe(gulp.dest('//s2t05/progetti/ORATRIOS/GitLab/Src/Oratrios/Frontend'));

});