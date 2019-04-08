import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import PreSuperTypes from './PreSuper.types';

const InputLabelProps = { shrink: true };

const PreSuper = (props: PreSuperTypes) => {
	const { classes } = props;

	return (
		<form className={classes.container} noValidate autoComplete="off">
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="age"
						label="Age"
						helperText="Your age"
						className={classes.textField}
						value={props.age}
						margin="normal"
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="preservationAge"
						label="Preservation Age"
						helperText="Your Super preservation age"
						className={classes.textField}
						value={props.preservationAge}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="yearsUntilPreservationAge"
						label="Years until Preservation Age"
						helperText="Years until you reach your preservation age"
						className={classes.textField}
						value={props.yearsUntilPreservationAge}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="preservationAgeReached"
						label="Preservation Age Year"
						helperText="Year you reached your preservation age"
						className={classes.textField}
						value={props.preservationAgeReached}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="postTaxSavingsRate"
						label="Post Tax Savings Rate"
						helperText="Yearly Savings rate post tax %"
						className={classes.textField}
						value={props.postTaxSavingsRate}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="growthRate"
						label="Growth Rate w/ Inflation"
						helperText="Inflation adjusted growth rate %"
						className={classes.textField}
						value={props.growthRate}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="lifestyleSpendYear"
						label="Cost of Living"
						helperText="How much you spend a year at current lifestyle "
						className={classes.textField}
						value={props.lifestyleSpendYear}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="lifestyleSpendMonth"
						label="Monthly Cost of Living"
						helperText="How much you spend a month at current lifestyle "
						className={classes.textField}
						value={props.lifestyleSpendMonth}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="sustainableNetworthLater"
						label="Sustainable Networth"
						helperText="Networth needed in order to sustain current lifestyle until preservation age after you hit your Pre Super Number"
						className={classes.textField}
						value={props.sustainableNetworthLater}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="sustainableNetworthNow"
						label="Current Sustainable Networth"
						helperText="Networth needed in order to sustain current lifestyle until preservation age right now"
						className={classes.textField}
						value={props.sustainableNetworthNow}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="moreSavings"
						label="How much to Save"
						helperText="How much more you need to save"
						className={classes.textField}
						value={props.moreSavings}
						margin="normal"
						InputLabelProps={InputLabelProps}
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="moreYears"
						label="Years Remaining"
						helperText="How long in years will it take you to get to your number factoring in your current net worth, inflation rate and rate of return"
						className={classes.textField}
						value={props.moreYears}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="preservationAgeMinusPreSuperNumber"
						label="Years Remaining minus Super"
						helperText="Preservation age minus how long it will take you to reach your Pre Super Number in years"
						className={classes.textField}
						value={props.preservationAgeMinusPreSuperNumber}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<TextField
						id="preSuperYear"
						label="Pre Super Year"
						helperText="What year it will be when you finish step 1"
						className={classes.textField}
						value={props.preSuperYear}
						margin="normal"
						InputLabelProps={InputLabelProps}
						disabled
					/>
				</Grid>
			</Grid>
		</form>
	);
};

export default PreSuper;
