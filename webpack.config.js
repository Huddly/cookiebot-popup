const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreviewGeneratorPlugin = require('./plugins/preview-generator-plugin');
const outputDir = './dist';
const entry = ['./src/js/app.js', './src/scss/app.scss'];

module.exports = (env) => {
	return [
		{
			entry: entry,
			output: {
				path: path.join(__dirname, outputDir),
				filename: '[name].js',
				publicPath: '/dist/',
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: 'babel-loader',
					},
					{
						test: /\.css$/i,
						use: [MiniCssExtractPlugin.loader, 'css-loader'],
					},
					{
						test: /\.scss$/i,
						use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
					},
				],
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: 'style.css',
				}),
				new HtmlWebpackPlugin({
					inject: false,
					template: 'src/html/app.html',
					filename: '../artifacts/popup.html',
				}),
				new PreviewGeneratorPlugin({
					template: 'src/html/app.html',
					filename: '../index.html',
					title: 'Huddly cookiebot dialog preview',
					styles: ['/dist/style.css', 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'],
					scripts: ['/dist/main.js'],
				}),
			],
			optimization: {
				minimizer: [new CssMinimizerPlugin()],
			},
		},
	];
};
