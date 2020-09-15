const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const path = require('path')

const basePath = path.resolve(process.cwd(), './src')
function taskBuildPackage(done) {

  gulp.src(`${basePath}/components/**/src/index.{css,less}`)
    .pipe(less())
    .pipe(rename(function(filePath) {
      console.log('=== rename ===', filePath, filePath.dirname.replace('/src', '/style'))
      return {
        dirname: filePath.dirname.replace('/src', '/style'),
        basename: 'test',
        extname: '.css'
      }
    }))
    .pipe(gulp.dest(function(file) {
      return path.resolve(file.cwd, './dist/components/')
    }))

  done()
}

exports.default = taskBuildPackage

// gulp.task('default', gulp.parallel(taskPackages))
