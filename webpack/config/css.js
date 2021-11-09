const isProduction = process.env.NODE_ENV === 'production';
const filename = isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css';

const plugins = [];
const rules = [];

function createCSSRule(test, loader, options) {
  const use = [
    {
      loader: 'css-loader',
      options: {
        // how many loaders before css-loader should be applied to [@import]ed resources.
        // stylePostLoader injected by vue-loader + postcss-loader
        importLoaders: 1 + 1,
        esModule: false, // css-loader using ES Modules as default in v4, but vue-style-loader support cjs only.
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [require('autoprefixer')],
        },
      },
    },
  ];

  if (isProduction) {
    use.unshift({
      loader: require('mini-css-extract-plugin').loader,
    });
  } else {
    use.unshift({
      loader: 'vue-style-loader',
    });
  }

  if (loader) {
    use.push({ loader, options });
  }

  return { test, use };
}

if (isProduction) {
  plugins.push(
    new (require('mini-css-extract-plugin'))({
      filename,
      chunkFilename: filename,
    }),
  );
}

rules.push(
  createCSSRule(/\.css$/),
  createCSSRule(/\.p(ost)?css$/),
  createCSSRule(/\.scss$/, 'sass-loader'),
);

module.exports = {
  plugins,
  module: { rules },
};
