import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const InputLabelProps = { shrink: true };

const Super = (props) => {
	const { classes } = props;

	return (
		<form className={classes.container} noValidate autoComplete="off">
			<TextField
				id="retireYear"
				label="What year it will be when you finish step 1"
				className={classes.textField}
				value={props.retireYear}
				margin="normal"
				InputLabelProps={InputLabelProps}
				disabled
			/>
			<TextField
				id="preservationSuper"
				label="How much you need in Super at your preservation age to last you forever"
				className={classes.textField}
				value={props.preservationSuper}
				margin="normal"
				InputLabelProps={InputLabelProps}
				startAdornment={<InputAdornment position="start">$</InputAdornment>}
				disabled
			/>
			<TextField
				id="preSuperAmount"
				label="How much Super you will have at the end of reaching your Pre Super Number"
				className={classes.textField}
				value={props.preSuperAmount}
				margin="normal"
				InputLabelProps={InputLabelProps}
				startAdornment={<InputAdornment position="start">$</InputAdornment>}
				disabled
			/>
			<TextField
				id="fiSuper"
				label="How much you need to have in Super at the start of FIRE for it to grow to you FI number"
				className={classes.textField}
				value={props.fiSuper}
				margin="normal"
				InputLabelProps={InputLabelProps}
				startAdornment={<InputAdornment position="start">$</InputAdornment>}
				disabled
			/>
			<TextField
				id="amountToSave"
				label="How much more $ you need to put in before you FIRE"
				className={classes.textField}
				value={props.amountToSave}
				margin="normal"
				InputLabelProps={InputLabelProps}
				startAdornment={<InputAdornment position="start">$</InputAdornment>}
				disabled
			/>
			<TextField
				id="superYears"
				label="How long in years will it take you to get to your number factoring in your current net worth, inflation rate and rate of return"
				className={classes.textField}
				value={props.superYears}
				margin="normal"
				InputLabelProps={InputLabelProps}
				disabled
			/>
		</form>
	);
};

export default Super;
