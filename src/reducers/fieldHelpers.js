import { actions } from 'react-redux-form';

function findFields(form = {}, fieldStems = []) {
	const fields = [];
	Object.keys(form.fields).forEach((field) => {
		fieldStems.forEach((fieldStem) => {
			if (field.startsWith(fieldStem)) {
				fields.push(form.fields[field]);
			}
		});
	});
	return fields;
}

function findFieldNames(form = {}, fieldStems = []) {
	const fields = [];
	Object.keys(form.fields).forEach((field) => {
		fieldStems.forEach((fieldStem) => {
			if (field.startsWith(fieldStem)) {
				fields.push(field);
			}
		});
	});
	return fields;
}

function fieldsInvalid(form = {}, fieldStems = []) {
	const fields = findFields(form, fieldStems);
	const index = fields.findIndex((field) => {
		const invalid = field.valid === false;
		return invalid;
	});
	return index !== -1;
}

function fieldsResetValidity(dispatch, form = {}, fieldStems = []) {
	const fields = findFieldNames(form, fieldStems);
	fields.forEach((field) => {
		dispatch(actions.resetValidity(`${form.model}.${field}`));
	});
}

export {
	findFields,
	fieldsInvalid,
	fieldsResetValidity
};
