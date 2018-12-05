const gulp = require('gulp');
const pump = require('pump');
const rheniumrc = require('../../requireRheniumConfig');

const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';

gulp.task('html', function(cb) {
  return pump(
    [
      gulp.src(rheniumrc.directories.src.html),
      gulp.dest(
        isDevelopment
          ? rheniumrc.directories.dev.html
          : rheniumrc.directories.prod.html
      ),
    ],
    cb
  );
});
