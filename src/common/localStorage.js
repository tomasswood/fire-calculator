export const loadState = (initialState) => {
	try {
		const state = localStorage.getItem('fire_calculator');
		if (!state) {
			return initialState;
		}

		return JSON.parse(state);
	} catch (err) {
		return initialState;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('fire_calculator', serializedState);
	} catch (err) {
		console.warn('Could not save state', err);
	}
};
