const { src, dest, watch, series, parallel } = require('gulp')

const browSync = require('browser-sync').create()
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')


const fc = require('gulp-file-include')
const min = require('gulp-htmlmin')
const size = require('gulp-size')
const del = require('del')

const html = () => {
  return src('./src/html/*.*')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(fc())
    .pipe(size())
    .pipe(
      min({
        collapseWhitespace: true,
      })
    )
    .pipe(size())
    .pipe(dest('./public'))
    .pipe(browSync.stream())
}

//server

const server = () => {
  browSync.init({
    server: {
      baseDir: './public',
    },
  })
}
// delet derectory

const clear = () => {
  return del('./public')
}


// watch
const watcher = () => {
  watch('./src/html/**/*.html', html)
}

exports.html = html
exports.watch = watcher
exports.clear = clear

exports.dev = series(clear, html, parallel(watcher, server))
