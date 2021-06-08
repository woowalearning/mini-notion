const Dotenv = require('dotenv-webpack');

module.exports = (env, options) => {
  console.log(env, options);

  return {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
      ],
    },
    plugins: [
      new Dotenv({
        path: '../.env',
      }),
    ],
  };
};
