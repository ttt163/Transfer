// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const webpack = require('webpack');
const path = require('path'); // 导入路径包
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const TEM_PATH = path.resolve(APP_PATH, 'templates');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    entry: path.resolve(APP_PATH, 'index.js'), //入口文件
    output: {
        path: BUILD_PATH, // 指定打包之后的文件夹
        // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
        // filename: 'bundle.js' // 指定打包为一个文件 bundle.js
        filename: '[name].js' // 可以打包为多个文件
    },
    // 使用loader模块
    module: {
        rules: [
            // js 文件
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["react", "es2015","stage-0"],
                        plugins: ['transform-runtime']
                    }
                }
            },
            // css 文件
            {
                test: /\.(css|scss$)$/,
                use: [{
                    loader: "style-loader"
                },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            },
           /* //解析.scss文件
            {
                test: /\.scss$/,
                use:["css-loader","sass-loader"]
            },*/
            // 字体
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: 'file-loader'
            },
            // 图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'app',
            template: path.resolve(TEM_PATH, 'index.html'),
            //引用模板文件名
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};