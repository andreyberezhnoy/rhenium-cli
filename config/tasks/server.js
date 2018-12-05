const gulp = require('gulp');
const bsync = require('browser-sync');
const rheniumrc = require('../../requireRheniumConfig');

gulp.task('server', function() {
  bsync.init(rheniumrc.server.config);
  bsync.watch(rheniumrc.server.watch).on('change', bsync.reload);
});
