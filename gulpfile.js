const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const Server = require('karma').Server;

const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var lintFiles = ['**/*.js', '!node_modules/**', '!**/build/**', '!**/*spec.js',
'!**/*test.js', '!test/**bundle.**', '!*.conf.js'];
var statFiles = ['./client/app/**/*.html', './client/app/images/**.*'];

gulp.task('webpack:dev', () => {
  gulp.src('client/app/js/entry.js')
    .pipe(webpack( {
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('client/build'));
});

gulp.task('static:dev', () => {
  gulp.src(statFiles)
    .pipe(gulp.dest('client/build'));
});

gulp.task('sass:dev', () => {
  gulp.src('client/app/scss/*.scss')
   .pipe(maps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('client/build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack:test', () => {
  return gulp.src('client/test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('test:karma', ['webpack:test'], (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('mocha', () => {
  return gulp.src('api_server/test/**/*test.js')
    .pipe(mocha());
});

gulp.task('default', ['build', 'mocha', 'test:karma']);
gulp.task('build', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('lint', ['lint:dev']);
