import { modeled } from 'react-redux-form';

const initialState = {
	phones: [],
	colors: []
};

export default function info(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
	return state;
}

const modeledReducer = modeled(info, 'info');
export default modeledReducer;
