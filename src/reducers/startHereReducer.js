import React from 'react';

import { format } from 'date-fns';

export const StartHereContext = React.createContext();

export const initialState = {
	/** User entered */
	dob: format(new Date(), 'YYYY-MM-DD'), // B17
	currentNetWorth: 0, // B18
	currentSuper: 0, // B19
	superGuarantee: 0, // B20
	investmentGrowthRate: 0, // B21
	inflationRate: 0, // B22
	incomePreTax: 0, // B23
	incomePostTax: 0, // B24
	postTaxSavings: 0, // B25

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
