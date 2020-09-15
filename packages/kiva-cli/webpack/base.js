const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const genStyleLoaders = require('./util/genStyleLoaders')

module.exports = function() {
  const baseConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          loader: genStyleLoaders(),
        },
        {
          test: /\.less$/,
          loader: genStyleLoaders('less-loader'),
        },
        {
          test: /\.(png|jpe?g|gif|webp|bmp)(\?.*)?$/,
          loader: require.resolve('url-loader'),
          options: {
            limit: 1024 * 4,
            esModule: false,
            name: 'static/img/[name].[contenthash:8].[ext]',
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            compilerOptions: {
              // "noImplicitAny": false,
              "module": "es6",
              // "target": "es6",
              // "jsx": "react",
              // "allowJs": true,
              // "moduleResolution": "Node",
              // "experimentalDecorators": true,
              // "lib": ["es2017", "dom"],
            }
          }
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "loose": false,
                  "modules": "commonjs",
                  "spec": true,
                  "targets": {
                      "browsers": [
                        "last 3 Chrome versions",
                        "last 3 Firefox versions",
                        "Safari >= 10",
                        "Explorer >= 11",
                        "Edge >= 12",
                        "iOS >= 10",
                        "Android >= 6"
                      ]
                  },
                  // "useBuiltIns": "usage",
                  "debug": false
                }
              ]
            ],
            plugins: [ '@babel/plugin-transform-runtime' ],
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    resolve: {
      alias: {
        '@ui': process.cwd(),
      }
    },
  }
  return baseConfig
}
