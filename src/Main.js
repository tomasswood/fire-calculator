import React, { useReducer } from 'react';
import useDebouncedCallback from 'use-debounce/lib/callback';

import orange from '@material-ui/core/colors/orange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { loadState, saveState } from './common/localStorage';
import startHereReducer, { StartHereContext, initialState } from './reducers/startHereReducer';

import App from './App';

const theme = createMuiTheme({
	palette: {
		primary: orange,
		type: 'light',
	},
});

const Main = () => {
	const [store, dispatch] = useReducer(startHereReducer, loadState(initialState));
	const [debouncedCallback] = useDebouncedCallback((state) => saveState(state), 1000);

	debouncedCallback(store);

	return (
		<MuiThemeProvider theme={theme}>
			<StartHereContext.Provider value={{ store, dispatch }}>
				<App />
			</StartHereContext.Provider>
		</MuiThemeProvider>
	);
};

export default Main;
