'use strict';

const path = require('path');
const gulp = require('gulp');
const reqDir = require('require-dir');
const rheniumrc = require('./config/requireRheniumConfig');
const tasks = {};

reqDir(path.resolve(__dirname, 'config/tasks/'), {
  recurse: true,
});

switch (rheniumrc.styles) {
  case 'sass':
    tasks.styles = 'sass';
    break;

  case 'scss':
    tasks.styles = 'scss';
    break;

  case 'stylus':
    tasks.styles = 'stylus';
    break;

  case 'less':
    tasks.styles = 'less';
    break;

  default:
    tasks.styles = 'css';
    break;
}

tasks.parallel = rheniumrc.server.init
  ? gulp.parallel('watch', 'server')
  : gulp.parallel('watch');

gulp.task('dev', gulp.series('html', 'images', tasks.styles, tasks.parallel));

gulp.task('prod', gulp.series(gulp.parallel('html', 'images', tasks.styles)));

gulp.task('default', gulp.series('dev'));
