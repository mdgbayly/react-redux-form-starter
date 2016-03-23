import { createStore, applyMiddleware, compose } from 'redux';
// import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/DevTools';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(history, initialState) {

	const reduxRouterMiddleware = routerMiddleware(history);
	let enhancer = compose(
		applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
	);

	if (__DEVTOOLS__) {
		enhancer = compose(
			enhancer,
			DevTools.instrument()
			// ,persistState(getDebugSessionKey())
		);
	}

	const store = createStore(rootReducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default)
		);
	}

	return store;
}
/*
function getDebugSessionKey() {
	// You can write custom logic here!
	// By default we try to read the key from ?debug_session=<key> in the address bar
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null;
}
*/
