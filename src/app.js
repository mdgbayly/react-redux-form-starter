import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';

// Create an enhanced history that syncs navigation events with the store
const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Root store={store} history={history} />,
	document.getElementById('app')
);

if (__DEVTOOLS__) {
	const showDevTools = require('./showDevTools');
	showDevTools.default(store);
}
