'use strict';


var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var autoprefixer = require('autoprefixer');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cssnano = require('cssnano');
var webpack = require('webpack');
var PORT = 9000;

module.exports = {
    entry: __dirname + "/app/",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/bower_components/jquery/dist/jquery.js',
            'bootstrap': __dirname + '/bower_components/bootstrap/dist',
            'angular': __dirname + '/bower_components/angular/angular.js',
            'ui.router': __dirname + '/bower_components/angular-ui-router/release/angular-ui-router.js',
            'css': __dirname + '/css/',
            'img': __dirname + '/img/'
        }
    },
    devServer: {
        port: PORT
    },
    watch: true,
    debug: true,
    devtool: 'source-map',
    jshint: {
        emitErrors: true,
        failOnHint: true
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    module: {
        preLoaders: [{
            test: /\.js$/, // include .js files
            exclude: /(node_modules|bower_components)/,
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['ng-annotate']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader?sourceMap!postcss-loader"
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: "file-loader?name=img/[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.html$/,
            loader: "html"
        }]
    },
    plugins: [
        function() {
            this.plugin("done", function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log("---------------------------------------------------");
                    console.log("ERRORS");
                    console.log("---------------------------------------------------");
                    stats.compilation.errors.map(function(item) {
                        console.log(item.message);
                    });
                    console.log("---------------------------------------------------");
                    process.exit(1);
                }
            });
        },
        new webpack.optimize.UglifyJsPlugin({
            exclude: /(node_modules|bower_components)/,
            minimize: true,
            sourceMap: true,
            compress: {
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
            favicon: 'favicon.ico',
            template: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        }),
        new WebpackShellPlugin({
            onBuildStart: ['echo "Bundling Started"'],
            onBuildEnd: ['node launch_app ' + PORT]
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: cssnano,
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
};
