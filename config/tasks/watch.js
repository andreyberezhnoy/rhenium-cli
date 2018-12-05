const gulp = require('gulp');
const rheniumrc = require('../../requireRheniumConfig');

gulp.task('watch', function() {
  gulp.watch(rheniumrc.directories.watch.html, gulp.series('html'));
  gulp.watch(
    rheniumrc.directories.watch[rheniumrc.styles],
    gulp.series(rheniumrc.styles)
  );
});
