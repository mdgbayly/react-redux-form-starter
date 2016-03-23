import React from 'react';
import App from '../components/Application';
import InfoForm from '../components/InfoForm';
import {IndexRoute, Route} from 'react-router';

export default (
	<Route path="/" component={App} >
		<IndexRoute component={InfoForm} />
	</Route>
);
