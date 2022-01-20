// import { src, dest } from 'gulp'
const { src, dest } = require('gulp')

const html = () => {
  return src('./src/html/*.*')
  .pipe(dest('./public'))
}
exports.html = html
