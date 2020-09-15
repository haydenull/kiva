const gulp = require('gulp')
const less = require('gulp-less')

const basePath = path.resolve(process.cwd(), './src')
function taskBuildPackage(done) {

  gulp.src(`${basePath}/components/**/src/index.{less,css}`)
    .pipe(less())
    .pipe(gulp.dest(path.resolve(process.cwd(), './dist/styles')))

  done()
}

module.exports = taskBuildPackage

// gulp.task('default', gulp.parallel(taskPackages))
