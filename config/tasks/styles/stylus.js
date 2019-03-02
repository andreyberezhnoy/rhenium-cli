const gulp = require('gulp')
const pump = require('pump')
const stylus = require('gulp-stylus')
const srcmaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rheniumrc = require('../../requireRheniumConfig')

const env = process.env.NODE_ENV
const isDevelopment = env === 'development'

gulp.task('scss', function(cb) {
  return pump(
    [
      gulp.src(rheniumrc.directories.src.stylus, { allowEmpty: true }),
      srcmaps.init(),
      stylus({
        compress: !isDevelopment,
      }),
      postcss([
        autoprefixer({
          browsers: ['>0.25%', 'Firefox ESR', 'Safari >= 6'],
        }),
      ]),
      srcmaps.write('.'),
      gulp.dest(
        isDevelopment
          ? rheniumrc.directories.dev.css
          : rheniumrc.directories.prod.css
      ),
    ],
    cb
  )
})
