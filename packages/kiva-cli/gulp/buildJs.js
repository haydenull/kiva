const gulp = require('gulp')
const babel = require('gulp-babel')
const path = require('path')
const rename = require('gulp-rename')

const babelConfig = require('../config/babel.config')

function taskBuildJs() {
  const basePath = path.resolve(process.cwd(), './src')
  const destDir = path.resolve(process.cwd(), './lib')
  return gulp.src([`${basePath}/**/*.js`, `!${basePath}/components/**`], { allowEmpty: true })
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(destDir))
}

exports.default = gulp.series(taskBuildJs)
