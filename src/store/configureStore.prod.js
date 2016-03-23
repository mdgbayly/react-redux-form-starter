import {createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(history, initialState) {

	const reduxRouterMiddleware = routerMiddleware(history);

	const enhancer = applyMiddleware(
		thunkMiddleware,
		reduxRouterMiddleware
	);

	const store = createStore(rootReducer, initialState, enhancer);

	return store;
}
