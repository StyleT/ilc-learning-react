const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');

const wpModule =  {
    rules: [
        {
            test: /\.js?$/,
            exclude: [path.resolve(__dirname, 'node_modules')],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }
    ],
};

module.exports = [{
    entry: path.resolve(__dirname, 'src/client-entry.spa.js'),
    output: {
        filename: 'client.js',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'build'),
    },
    module: wpModule,
    plugins: [
        new WrapperPlugin({
            test: /\.js$/, // only wrap output of bundle files with '.js' extension
            header: '(function(define){\n',
            footer: '\n})((window.ILC && window.ILC.define) || window.define);'
        }),
    ],
    devtool: 'source-map',
    mode: 'production',
},{
    entry: path.resolve(__dirname, 'src/server-entry.js'),
    target: 'node',
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'build'),
    },
    module: wpModule,
    devtool: 'source-map',
    mode: 'production',
}];

