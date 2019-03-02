const gulp = require('gulp')
const pump = require('pump')
const rheniumrc = require('../requireRheniumConfig')
const imagemin = require('gulp-imagemin')

const env = process.env.NODE_ENV
const isDevelopment = env === 'development'

gulp.task('images', function(cb) {
  return pump(
    [
      gulp.src(rheniumrc.directories.src.images),
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeDimensions: true }, { cleanupIDs: false }],
        }),
      ]),
      gulp.dest(
        isDevelopment
          ? rheniumrc.directories.dev.images
          : rheniumrc.directories.prod.images
      ),
    ],
    cb
  )
})
