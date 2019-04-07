export const pv = (rate, periods, payment, future = 0, type = 0) => {
	// Return present value
	if (rate === 0) {
		return -payment * periods - future;
	} else {
		return (
			((1 - Math.pow(1 + rate, periods)) / rate * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods)
		);
	}
};

export const fv = (rate, periods, payment, value, type = 0) => {
	// Return future value
	let result;
	if (rate === 0) {
		result = value + payment * periods;
	} else {
		const term = Math.pow(1 + rate, periods);
		if (type === 1) {
			result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
		} else {
			result = value * term + payment * (term - 1) / rate;
		}
	}

	return -result;
};

export const pmt = (rate, nper, pv, fv, type) => {
	if (!fv) fv = 0;
	if (!type) type = 0;

	if (rate === 0) return -(pv + fv) / nper;

	const pvif = Math.pow(1 + rate, nper);
	let result = rate / (pvif - 1) * -(pv * pvif + fv);

	if (type === 1) {
		result /= 1 + rate;
	}

	return result;
};

export const ipmt = (rate, period, periods, present, future, type = 0) => {
	// Compute payment
	const payment = pmt(rate, periods, present, future, type);

	// Compute interest
	let interest;
	if (period === 1) {
		if (type === 1) {
			interest = 0;
		} else {
			interest = -present;
		}
	} else {
		if (type === 1) {
			interest = fv(rate, period - 2, payment, present, 1) - payment;
		} else {
			interest = fv(rate, period - 1, payment, present, 0);
		}
	}

	// Return interest
	return interest * rate;
};

export const nper = (rate, payment, present, future = 0, type = 0) => {
	const num = payment * (1 + rate * type) - future * rate;
	const den = present * rate + payment * (1 + rate * type);
	return Math.log(num / den) / Math.log(1 + rate);
};
