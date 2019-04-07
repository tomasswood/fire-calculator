import React, { useReducer } from 'react';
import useDebouncedCallback from 'use-debounce/lib/callback';

import { loadState, saveState } from './common/localStorage';
import startHereReducer, { StartHereContext, initialState } from './reducers/startHereReducer';

import App from './App';

const Main = () => {
	const [store, dispatch] = useReducer(startHereReducer, loadState(initialState));
	const [debouncedCallback] = useDebouncedCallback((state) => saveState(state), 1000);

	debouncedCallback(store);

	return (
		<StartHereContext.Provider value={{ store, dispatch }}>
			<App />
		</StartHereContext.Provider>
	);
};

export default Main;
