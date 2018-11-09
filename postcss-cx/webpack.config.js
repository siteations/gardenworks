const devMode = process.env.NODE_ENV !== 'production'

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(devMode);

module.exports = {
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'pack')
    },
    module: {
    	rules: [{
                    test: /\.css$/,
                    //use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    use: [ MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: {
                                              importLoaders: 1,
                                            }},
                    //                         ,
                    { loader: 'postcss-loader'}
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                      'file-loader'
                    ]
                  }


                ]
    },
     plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css'
    }),
  ]
};
