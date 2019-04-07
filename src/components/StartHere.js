import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const InputLabelProps = { shrink: true };

const StartHere = (props) => {
	const { classes, updateStoreValue } = props;

	const handleChange = (name, isNumber = false) => (event) => {
		updateStoreValue(name, isNumber ? Number(event.target.value) : event.target.value);
	};

	return (
		<div className={classes.container}>
			<form noValidate autoComplete="off">
				<TextField
					id="dob"
					label="Date of Birth"
					className={classes.textField}
					value={props.dob}
					onChange={handleChange('dob')}
					type="date"
					margin="normal"
					InputLabelProps={InputLabelProps}
				/>
				<TextField
					id="currentNetWorth"
					label="Current net worth excluding Super and any equity in your home"
					className={classes.textField}
					value={props.currentNetWorth}
					onChange={handleChange('currentNetWorth', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
				<TextField
					id="currentSuper"
					label="How much do you currently have in Super?"
					className={classes.textField}
					value={props.currentSuper}
					onChange={handleChange('currentSuper', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
				<TextField
					id="superGuarantee"
					label="Super Guarantee from Employer %"
					className={classes.textField}
					value={props.superGuarantee}
					onChange={handleChange('superGuarantee', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					endAdornment={<InputAdornment position="end">%</InputAdornment>}
				/>
				<TextField
					id="investmentGrowthRate"
					label="Growth rate of investments that make up your net worth %"
					className={classes.textField}
					value={props.investmentGrowthRate}
					onChange={handleChange('investmentGrowthRate', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					endAdornment={<InputAdornment position="end">%</InputAdornment>}
				/>
				<TextField
					id="inflationRate"
					label="Estimated inflation rate %"
					className={classes.textField}
					value={props.inflationRate}
					onChange={handleChange('inflationRate', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					endAdornment={<InputAdornment position="end">%</InputAdornment>}
				/>
				<TextField
					id="incomePreTax"
					label="Household income earned pre tax per year. "
					className={classes.textField}
					value={props.incomePreTax}
					onChange={handleChange('incomePreTax', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
				<TextField
					id="incomePostTax"
					label="Household income earned post tax per year. "
					className={classes.textField}
					value={props.incomePostTax}
					onChange={handleChange('incomePostTax', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
				<TextField
					id="postTaxSavings"
					label="How much post tax money can you save each year?"
					className={classes.textField}
					value={props.postTaxSavings}
					onChange={handleChange('postTaxSavings', true)}
					type="number"
					margin="normal"
					InputLabelProps={InputLabelProps}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>

				<br />

				<TextField
					id="fireYears"
					label="How long in years will it take you to reach FIRE?"
					className={classes.textField}
					value={props.fireYears}
					margin="normal"
					InputLabelProps={InputLabelProps}
					disabled
				/>
				<TextField
					id="fireYear"
					label="What year will it be when I reach FIRE?"
					className={classes.textField}
					value={props.fireYear}
					margin="normal"
					type="number"
					InputLabelProps={InputLabelProps}
					disabled
				/>
				<TextField
					id="fireAge"
					label="What age will I be when I reach FIRE?"
					className={classes.textField}
					value={props.fireAge}
					margin="normal"
					type="number"
					InputLabelProps={InputLabelProps}
					disabled
				/>
			</form>
			{/*<FireChart data={getChartData()} />*/}
		</div>
	);
};

export default StartHere;
