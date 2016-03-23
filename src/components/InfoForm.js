import React from 'react';
import { connect } from 'react-redux';
import { Field, actions, createFieldClass } from 'react-redux-form';

import CustomInput from './CustomInput';

const CustomField = createFieldClass({
	CustomInput: (props) => ({
		...props,
		defaultValue: props.modelValue,
		name: props.model,
		value: props.modelValue
	})
});

export class InfoForm extends React.Component {

	render() {
		const { info, dispatch } = this.props;

		return (
			<div>
				<h1 id="main">Main</h1>

				<form>
					<h2>Deep Forms</h2>

					<label htmlFor="">Phones (Uncontrolled - remove breaks?)</label>

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

					<br/>
					<br/>

					<label htmlFor="">Colors (Controlled - remove works)</label>

					<ul>
						{ info.colors.map((color, i) =>
							<li key={i}>
								<CustomField model={`info.colors[${i}]`} key={i}>
									<CustomInput type="text" />
								</CustomField>
								<button type="button" onClick={() => dispatch(actions.remove('info.colors', i))}>
									X
								</button>
							</li>
						)}
					</ul>

					<button type="button" onClick={() => dispatch(actions.push('info.colors', null))}>
						Add Color
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
