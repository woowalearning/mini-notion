module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
          use: [{
                  loader: 'style-loader',
              },
              {
                  loader: 'css-loader',
              },
          ],
      },
    ],
  },
};
