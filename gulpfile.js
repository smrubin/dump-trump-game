// Include gulp
var gulp = require('gulp');
// Define base folders
var src = 'src/';
var dest = 'build/';
// Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// Copy over html
gulp.task('html', function() {
  return gulp.src(src + '*.html')
    .pipe(gulp.dest(dest));
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(src + 'js/*.js')
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dest + 'js'));
});

// Concatenate, minify, and auto-prefix CSS
gulp.task('css', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']  // Include last two versions of all browsers, browsers with over 5% market share, and FireFox ESR
  };
  return gulp.src(src + 'css/*.css')
    .pipe(plugins.concat('style.min.css'))
    .pipe(plugins.autoprefixer(autoprefixerOptions))
    .pipe(plugins.cleanCss({keepSpecialComments: 0}))
    .pipe(gulp.dest(dest + 'css'));
});

//Minify and Cache images
gulp.task('images', function() {
  return gulp.src(src + 'img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'img'));
});

// Copy any configs to build
gulp.task('configs', function() {
  return gulp.src('.htaccess')
    .pipe(gulp.dest(dest));
});


// Watch for changes in files
gulp.task('watch', function() {
  gulp.watch(src + '*.html', ['html']);
  gulp.watch(src + 'js/*.js', ['scripts']);
  gulp.watch(src + 'css/*.css', ['css']);
  gulp.watch(src + 'images/**/*', ['images']);
  gulp.watch('.htaccess', ['configs']);
});

// Default Gulp Task
gulp.task('default', ['html', 'scripts', 'css', 'images', 'configs', 'watch']);