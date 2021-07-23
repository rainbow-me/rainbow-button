const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const images = require('@rollup/plugin-image');
const copy = require('rollup-plugin-copy');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      }),
      images({ include: ['src/images/rainbow-logo.png', '**/*.jpg'] }),
      copy({
        targets: [
          { src: 'src/images/**/*', dest: 'dist/public' }
        ]
      })
    );
    return config;
  },
};