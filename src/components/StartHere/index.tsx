import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import StartHereTypes from './StartHere.types';

const InputLabelProps = { shrink: true };

const StartHere = (props: StartHereTypes) => {
	const { classes, updateStoreValue } = props;

	const handleChange = (name: string, isNumber: boolean = false) => (event: any) => {
		updateStoreValue(name, isNumber ? Number(event.target.value) : event.target.value);
	};

	return (
		<div className={classes.container}>
			<form noValidate autoComplete="off">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="dob"
							label="DOB"
							helperText="Date of Birth"
							className={classes.textField}
							value={props.dob}
							onChange={handleChange('dob')}
							type="date"
							margin="normal"
							InputLabelProps={InputLabelProps}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="currentNetWorth"
							label="Current Net Worth"
							helperText="Current net worth excluding Super and any equity in your home"
							className={classes.textField}
							value={props.currentNetWorth}
							onChange={handleChange('currentNetWorth', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="currentSuper"
							label="Current Super"
							helperText="How much do you currently have in Super?"
							className={classes.textField}
							value={props.currentSuper}
							onChange={handleChange('currentSuper', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="superGuarantee"
							label="Super Guarantee"
							helperText="Super Guarantee from Employer %"
							className={classes.textField}
							value={props.superGuarantee}
							onChange={handleChange('superGuarantee', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="investmentGrowthRate"
							label="Growth Rate"
							helperText="Growth rate of investments that make up your net worth %"
							className={classes.textField}
							value={props.investmentGrowthRate}
							onChange={handleChange('investmentGrowthRate', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="inflationRate"
							label="Inflation Rate"
							helperText="Estimated inflation rate %"
							className={classes.textField}
							value={props.inflationRate}
							onChange={handleChange('inflationRate', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="incomePreTax"
							label="Household Income (Pre-Tax)"
							helperText="Household income earned pre tax per year. "
							className={classes.textField}
							value={props.incomePreTax}
							onChange={handleChange('incomePreTax', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="incomePostTax"
							label="Household Income (Post-Tax)"
							helperText="Household income earned post tax per year. "
							className={classes.textField}
							value={props.incomePostTax}
							onChange={handleChange('incomePostTax', true)}
							type="number"
							margin="normal"
							InputLabelProps={InputLabelProps}
							InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="postTaxSavings"
							label="Yearly Savings"
							helperText="How much post tax money can you save each year?"
							className={classes.textField}
							value={props.postTaxSavings}
							onChange={handleChange('postTaxSavings', true)}
							type="number"
							margin="normal"
							variant="filled"
							InputLabelProps={InputLabelProps}
							InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						/>
					</Grid>

					<br />

					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="fireYears"
							label="Years until FIRE"
							helperText="How long in years will it take you to reach FIRE?"
							className={classes.textField}
							value={typeof props.fireYears === 'number' ? props.fireYears.toFixed(2) : props.fireYears}
							margin="normal"
							InputLabelProps={InputLabelProps}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="fireYear"
							label="FIRE Year"
							helperText="What year will it be when I reach FIRE?"
							className={classes.textField}
							value={props.fireYear}
							margin="normal"
							type="number"
							InputLabelProps={InputLabelProps}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="fireAge"
							label="FIRE Age"
							helperText="What age will I be when I reach FIRE?"
							className={classes.textField}
							value={props.fireAge}
							margin="normal"
							type="number"
							InputLabelProps={InputLabelProps}
							disabled
						/>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default StartHere;
