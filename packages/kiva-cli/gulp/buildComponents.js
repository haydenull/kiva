const gulp = require('gulp')

const taskJs = require('./buildJs')
const taskStyle = require('./buildStyle')

exports.default = gulp.parallel(taskJs.default, taskStyle.default)
