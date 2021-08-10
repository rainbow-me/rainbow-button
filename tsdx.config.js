const images = require('@rollup/plugin-image');
const copy = require('rollup-plugin-copy');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      copy({
        targets: [
          { src: 'assets/images/**/*', dest: 'dist/public/images' }
        ]
      }),
      images({ incude: ['**/*.png', '**/*.jpg'] }),
      ...config.plugins,
    ]

    return config
  },
}
