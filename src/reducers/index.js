import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { formReducer } from 'react-redux-form';

import info from './info';

const rootReducer = combineReducers({
	info,
	infoForm: formReducer('info', {}),
	routing: routerReducer
});

export default rootReducer;
