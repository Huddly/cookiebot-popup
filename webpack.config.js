const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreviewGeneratorPlugin = require('./plugins/preview-generator-plugin');
const outputDir = './dist';
const entry = ['./src/js/app.js', './src/scss/app.scss'];

module.exports = (env) => {
	return [
		{
			entry,
			output: {
				path: path.join(__dirname, outputDir),
				filename: 'dialog.js',
				publicPath: '/dist/',
			},
			target: ['web', 'es5'],
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: 'babel-loader',
					},
					{
						test: /\.scss$/i,
						use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
					},
				],
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: 'dialog.css',
				}),
				new HtmlWebpackPlugin({
					inject: false,
					template: 'src/html/app.html',
					filename: '../dist/dialog.html',
				}),
				new PreviewGeneratorPlugin({
					template: 'src/html/app.html',
					filename: '../index.html',
					title: 'Huddly cookiebot dialog preview',
					styles: ['/dist/dialog.css', 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'],
					scripts: ['/dist/dialog.js'],
				}),
			],
			optimization: {
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							keep_classnames: true,
							output: {
								comments: false,
							},
						},
					}),
					new CssMinimizerPlugin(),
				],
			},
		},
	];
};
