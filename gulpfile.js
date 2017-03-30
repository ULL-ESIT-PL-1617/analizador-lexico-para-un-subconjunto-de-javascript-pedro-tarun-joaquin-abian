var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var shell = require('gulp-shell');
var task = require('shell-task');

gulp.task('build', function() {
        return gulp.src('').pipe(shell(['gitbook build docs public']));
});

gulp.task('deploygh', function() {
      return gulp.src('./public/**/*')
        .pipe(ghPages());
});


gulp.task('deploygb', function() {
        return gulp.src('').pipe(shell(['node ./scripts/deploy-gitbook.js']));
});

gulp.task('serve', function() {
        return gulp.src('').pipe(shell(['node index.js']));
});
