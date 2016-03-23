import React from 'react';
import { connect } from 'react-redux';
import { Field, actions } from 'react-redux-form';
import _ from 'lodash';

// import { fieldsResetValidity } from '../reducers/fieldHelpers';

export class InfoForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ariaAlert: null,
			ariaAlertId: _.uniqueId('qed-alert-')
		};
	}

	raiseAlert(alert) {
		this.setState({
			ariaAlert: alert,
			ariaAlertId: _.uniqueId('qed-alert-')
		});
	}

	handleSubmit(e) {
		e.preventDefault();
	}

	handleClickCancel(e) {
		e.preventDefault();
	}

	render() {
		const { info, dispatch } = this.props;

		return (
			<div>
				<h1 id="main">Main</h1>

				<div className="qed-offscreen" aria-atomic="true" role="alert">
					{this.state.ariaAlert && <p key={this.state.ariaAlertId}>{this.state.ariaAlert}</p>}
				</div>

				<form>
					<h2>Deep Forms</h2>

					<label htmlFor="">Phones</label>

					<ul>
						{ info.phones.map((phone, i) =>
							<li key={i}>
								<Field model={`info.phones[${i}]`} key={i}>
									<input type="text" />
								</Field>
								<button type="button" onClick={() => dispatch(actions.remove('info.phones', i))}>
									X
								</button>
							</li>
						)}
					</ul>

					<button type="button" onClick={() => dispatch(actions.push('info.phones', null))}>
						Add Phone
					</button>

				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { info: state.info };
}

export default connect(mapStateToProps)(InfoForm);
