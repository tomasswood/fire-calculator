import React, { Fragment, useContext, useMemo, useState } from 'react';

import { setStartHereValue } from './actions/startHereActions';
import {
	calculateFireValues,
	calculatePreSuperValues,
	calculateSuperValues,
	getChartData,
} from './common/calculations';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabContainer from './components/TabContainer';
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
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	menu: {
		width: 200,
	},
});

const App = ({ classes }) => {
	const { store, dispatch } = useContext(StartHereContext);

	// memoized calculations
	const preSuper = useMemo(() => calculatePreSuperValues(store), [store]);
	const superValues = useMemo(() => calculateSuperValues(store, preSuper), [store, preSuper]);
	const fireValues = useMemo(() => calculateFireValues(store, preSuper, superValues), [store, preSuper, superValues]);
	const chartData = useMemo(() => getChartData(store.currentNetWorth, preSuper), [store.currentNetWorth, preSuper]);

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

				{selectedTab === 0 && (
					<TabContainer>
						<StartHere classes={classes} updateStoreValue={updateStoreValue} {...store} {...fireValues} />
					</TabContainer>
				)}
				{selectedTab === 1 && (
					<TabContainer>
						<PreSuper classes={classes} {...preSuper} />
					</TabContainer>
				)}
				{selectedTab === 2 && (
					<TabContainer>
						<Super classes={classes} {...superValues} />
					</TabContainer>
				)}

				<FireChart data={chartData} />
			</div>
		</Fragment>
	);
};

export default withStyles(styles)(App);
