// Karma configuration
// Generated on Mon Sep 28 2015 11:29:47 GMT-0700 (Pacific Daylight Time)
var path = require('path');
var webpack = require('webpack');

var postLoaders = [ { //delays coverage til after tests are run, fixing transpiled source coverage error
	test: /\.js$/,
	exclude: /(test|node_modules|bower_components)\//,
	loader: 'istanbul-instrumenter' }
];

var devtool = 'inline-source-maps';

function isDebug(argument) {
	return argument === '--debug';
}

if (process.argv.some(isDebug)) {
	postLoaders = [];
	devtool = 'eval';
}

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],
		// list of files / patterns to load in the browser
		files: [
			'tests.webpack.js'
		],

		// list of files to exclude
		exclude: [
			'src/index.js'
		],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap']
		},

		webpack: { //kind of a copy of your webpack config
			devtool: devtool,
			module: {
				loaders: [{
					test: /\.js$/,
					loaders: ['babel'],
					exclude: /node_modules/,
					include: path.join(__dirname, 'src')
				},
				{
					test: /\.json$/,
					loaders: ['json']
				}],
				postLoaders: postLoaders
			},
			externals: {
				'cheerio': 'window',
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': true
			},
			plugins: [
				new webpack.NoErrorsPlugin(),
				new webpack.DefinePlugin({
					__CLIENT__: true,
					__SERVER__: false,
					__DEVELOPMENT__: true,
					__DEVTOOLS__: false	// <-------- DISABLE redux-devtools HERE
				})
			]
		},

		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},

		plugins: [
			'karma-webpack',
			'karma-sourcemap-loader',
			'karma-coverage',
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-mocha-reporter',
			'karma-spec-reporter'
		],
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec', 'coverage'],
		coverageReporter: {
			dir: 'coverage',
			reporters: [
				//{ type: 'html', subdir: 'report-html'},
				{ type: 'lcov', subdir: 'report-lcov'}
			]
		},
		// web server port
		port: 9876,
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// browsers: ['Chrome', 'Firefox'],
		browsers: ['Chrome'],
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};
