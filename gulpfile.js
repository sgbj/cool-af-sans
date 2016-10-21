const gulp = require('gulp'),
      watch = require('gulp-watch');
      iconfont = require('gulp-iconfont'),
      dot = require('dot')
      mkdirp = require('mkdirp'),
      fs = require('fs'),
      prefix = 'af';

gulp.task('default', () => {
    return gulp.src(['src/icons/*.svg'])
        .pipe(iconfont({
            fontName: 'cool-af-sans',
            prependUnicode: true,
            fontWidth: 1000,
            fontHeight: 1000,
            normalize: true,
            formats: ['ttf', 'eot', 'woff']
        }))
        .on('glyphs', (glyphs, options) => {
            mkdirp('dist/css', error => {
                if (error) {
                    console.error(error);
                } else {
                    const dots = dot.process({ path: './src/templates' });
                    fs.writeFileSync(`dist/css/${options.fontName}.css`, dots.css({ prefix, glyphs, options }));
                    fs.writeFileSync(`index.html`, dots.html({ prefix, glyphs, options }));
                }
            });
        })
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', () => {
    return watch(['src/**/*'], () => {
        gulp.start('default');
    });
});