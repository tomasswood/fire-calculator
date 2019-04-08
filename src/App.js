import React, { Fragment, useContext, useMemo, useState } from 'react';

import { setStartHereValue } from './actions/startHereActions';
import {
	calculateFireValues,
	calculatePreSuperValues,
	calculateSuperValues,
	getChartData,
} from './common/calculations';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import StartHere from './components/StartHere';
import PreSuper from './components/PreSuper';
import Super from './components/Super';
import FireChart from './components/FireChart';

import { StartHereContext } from './reducers/startHereReducer';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		width: '100%',
	},
	menu: {
		width: 200,
	},
});

const containerStyling = { padding: 8 * 3 };

const App = ({ classes }) => {
	const { store, dispatch } = useContext(StartHereContext);

	// memoized calculations
	const preSuper = useMemo(() => calculatePreSuperValues(store), [store]);
	const superValues = useMemo(() => calculateSuperValues(store, preSuper), [store, preSuper]);
	const fireValues = useMemo(() => calculateFireValues(store, preSuper, superValues), [store, preSuper, superValues]);
	const chartData = useMemo(() => getChartData(store, preSuper, superValues), [store, preSuper, superValues]);

	// dispatch updates for setting start here values
	const updateStoreValue = (name, value) => dispatch(setStartHereValue(name, value));

	// localised state
	const [selectedTab, setTab] = useState(0);
	const handleTabChange = (event, selectedTab) => {
		setTab(selectedTab);
	};

	return (
		<Fragment>
			<CssBaseline />
			<div className="App">
				<AppBar position="static">
					<Tabs value={selectedTab} onChange={handleTabChange}>
						<Tab label="Start Here" />
						<Tab label="Step 1: Pre Super" />
						<Tab label="Step 2: Super" />
					</Tabs>
				</AppBar>

				<Typography component="div" style={containerStyling}>
					{selectedTab === 0 && (
						<StartHere classes={classes} updateStoreValue={updateStoreValue} {...store} {...fireValues} />
					)}
					{selectedTab === 1 && <PreSuper classes={classes} {...preSuper} />}
					{selectedTab === 2 && <Super classes={classes} {...superValues} />}
				</Typography>

				<Typography component="div" style={{ containerStyling, maxWidth: 1000, margin: 'auto' }}>
					<FireChart data={chartData} />
				</Typography>
			</div>
		</Fragment>
	);
};

export default withStyles(styles)(withTheme(App));
