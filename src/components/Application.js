import React from 'react';
import { connect } from 'react-redux';

export class Application extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default connect()(Application);
