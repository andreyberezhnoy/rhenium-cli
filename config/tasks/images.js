const gulp = require('gulp');
const pump = require('pump');
const rheniumrc = require('../../requireRheniumConfig');

const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';

gulp.task('images', function(cb) {
  return pump(
    [
      gulp.src(rheniumrc.directories.src.images),
      gulp.dest(
        isDevelopment
          ? rheniumrc.directories.dev.images
          : rheniumrc.directories.prod.images
      ),
    ],
    cb
  );
});
