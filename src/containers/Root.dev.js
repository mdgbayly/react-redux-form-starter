import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../config/routes';

export default class Root extends Component {
	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<div>
					<Router history={history}>
						{routes}
					</Router>
				</div>
			</Provider>
		);
	}
}
