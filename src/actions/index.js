import QuestionService from '../services/QuestionService';
import {routeActions} from 'react-router-redux';
import { actions } from 'react-redux-form';

import errorTransformer from './errorTransformer';

export const UPDATE_ACTION = 'UPDATE_ACTION';
export function updateAction(action) {
	return {
		type: UPDATE_ACTION,
		action
	};
}

export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export function requestQuestion() {
	return {
		type: REQUEST_QUESTION
	};
}

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export function receiveQuestion(question) {
	return {
		type: RECEIVE_QUESTION,
		question
	};
}

export const ERROR = 'ERROR';
export function error(err) {
	return {
		type: ERROR,
		error: err
	};
}

export const INIT = 'INIT';
export function initialize(query) {
	return {
		type: INIT,
		query: query
	};
}

export function fetchQuestion(valenceHost) {
	return (dispatch, getState) => {
		dispatch(requestQuestion());

		return QuestionService.get(valenceHost, getState().app.apiUrl).then((response) => {
			dispatch(receiveQuestion(response.question));
			dispatch(updateAction(response.action));
		}, (err) => {
			dispatch(error(err));
			dispatch(routeActions.replace('/d2l/le/qed/error'));
		});
	};
}

export function cancel() {
	return (dispatch, getState) => {
		dispatch(routeActions.go(getState().app.returnUrl));
	};
}

export function saveQuestion(valenceHost, question) {
	return (dispatch, getState) => {

		dispatch(actions.setPending('question', true));

		return QuestionService.save(valenceHost, question, getState().action).then(
			() => dispatch(routeActions.go(getState().app.returnUrl))
		).catch((err) => {
			dispatch(actions.resetValidity('question'));
			dispatch(actions.setSubmitted('question', true));
			errorTransformer(err).forEach(error => {
				dispatch(actions.setErrors(error.field, {
					code: error.code
				}));
			});
			throw Error('SaveFailed');
		});
	};
}
