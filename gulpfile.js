const {src, dest, watch } = require('gulp')

const fc = require('gulp-file-include')
const min = require('gulp-htmlmin')
const size = require('gulp-size');

const html = () => {
  return src('./src/html/*.*')
  .pipe(fc())
  .pipe(size())
  .pipe(min({
    collapseWhitespace: true
  }))
  .pipe(size())
  .pipe(dest('./public'))
}

// watch
const watcher = () => {
  watch('./src/html/**/*.html', html)
}


exports.html = html
exports.watch = watcher