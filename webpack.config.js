/* eslint "no-console": 0 */

var path = require('path');
var webpack = require('webpack');

var production = process.env.NODE_ENV === 'production';
var devTools = !production && process.env.npm_package_config_devTools === 'true';
var hot = process.env.NODE_ENV === 'hot';
console.log('******************************************************');
console.log('PRODUCTION: ', production);
console.log('DEVTOOLS: ', devTools);
console.log('HMR: ', hot);
console.log('******************************************************');

var plugins = [
	// This plugins defines various variables that we can set to false
	// in production to avoid code related to them from being compiled
	// in our final bundle
	new webpack.DefinePlugin({
		__SERVER__:			!production,
		__DEVELOPMENT__: !production,
		__DEVTOOLS__:		devTools,
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	})
];

var entry = [
	'./src/app.js'
];

var jsLoaders = ['babel'];

if (production) {
	plugins = plugins.concat([
		// Cleanup the builds/ folder before
		// compiling our final assets
		// new CleanPlugin('builds'),

		// This plugin looks for similar chunks and files
		// and merges them for better caching by the user
		new webpack.optimize.DedupePlugin(),

		// This plugins optimizes chunks and modules by
		// how much they are used in your app
		new webpack.optimize.OccurenceOrderPlugin(),

		// This plugin prevents Webpack from creating chunks
		// that would be too small to be worth loading separately
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 51200 // ~50kb
		}),

		// This plugin minifies all the Javascript code of the final bundle
		new webpack.optimize.UglifyJsPlugin({
			mangle:	 true,
			compress: {
				warnings: false // Suppress uglification warnings
			}
		})
	]);
}

if (hot) {
	plugins = plugins.concat([
		new webpack.HotModuleReplacementPlugin()
	]);

	entry = [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	].concat(entry);

	jsLoaders.unshift('react-hot');
}

module.exports = {
	devtool: 'eval',
	entry: entry,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: ''
	},
	plugins: plugins,
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: jsLoaders,
			exclude: /node_modules/,
			include: path.join(__dirname, 'src')
		},
		{
			test: /\.json$/,
			loaders: ['json']
		}]
	}
};
