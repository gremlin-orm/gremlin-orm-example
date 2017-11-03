var gulp = require('gulp');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

gulp.task('serve', serve);

function serve() {
  nodemon({
    script: 'server/server.js'
  });
}


gulp.task('default', ['serve']);
