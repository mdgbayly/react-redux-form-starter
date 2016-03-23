/* eslint "no-console": 0 */
var context = require.context('./src', true, /\.js$/); //make sure you have your directory and regex test set correctly!
var files = context.keys();
var filteredFiles = files.filter(function(file) {
	switch (file) {
		case './index.js':
			return false;
		default:
			return true;
	}
});
filteredFiles.forEach(context);
