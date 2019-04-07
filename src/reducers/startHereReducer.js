import React from 'react';

export const StartHereContext = React.createContext();

export const initialState = {
	/** User entered */
	dob: '', // B17
	currentNetWorth: '', // B18
	currentSuper: '', // B19
	superGuarantee: '', // B20
	investmentGrowthRate: '', // B21
	inflationRate: '', // B22
	incomePreTax: '', // B23
	incomePostTax: '', // B24
	postTaxSavings: '', // B25

	/** Calculated */
	fireYears: '', // B28
	fireYear: '', // B29
	fireAge: '', // B30

	/** Static */
	superPreservation: [
		{
			age: 55,
			date: '01/07/1960',
		},
		{
			age: 56,
			date: '01/07/1961',
		},
		{
			age: 57,
			date: '01/07/1962',
		},
		{
			age: 58,
			date: '01/07/1963',
		},
		{
			age: 59,
			date: '01/07/1964',
		},
	],
};

const startHereReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_START_HERE_VALUE':
			return { ...state, [action.payload.key]: action.payload.value };

		case 'SET_START_HERE_VALUES':
			return { ...state, ...action.payload };

		default:
			return state;
	}
};

export default startHereReducer;
