import { createAction } from '../common/actionHelpers';

export const setStartHereValue = (key, value) => createAction('SET_START_HERE_VALUE', { key, value });

export const setStartHereValues = (payload) => createAction('SET_START_HERE_VALUES', payload);
