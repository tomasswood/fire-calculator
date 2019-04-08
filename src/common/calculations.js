import { addYears, format, differenceInYears, parse } from 'date-fns';
import { pmt, ipmt, fv, pv, nper } from '../common/excelFormulas';

export const calculateSuperValues = (startHere, preSuper) => {
	const formattedGrowthRate = parseFloat(preSuper.growthRate) / 100;
	const formattedSuperGuarantee = parseFloat(startHere.superGuarantee) / 100;

	const retireYear = addYears(new Date(), preSuper.moreYears).getFullYear();
	const preservationSuper = preSuper.lifestyleSpendYear / 0.04;
	const preSuperAmount =
		startHere.currentSuper >= preservationSuper
			? 'You have already reached your Super number'
			: Math.round(
					fv(
						formattedGrowthRate,
						preSuper.moreYears,
						-(startHere.incomePreTax * formattedSuperGuarantee),
						-startHere.currentSuper,
					),
			  );
	const fiSuper = Math.round(
		pv(formattedGrowthRate, preSuper.preservationAgeMinusPreSuperNumber - 1.71, 0, -preservationSuper),
	);
	const amountToSave =
		startHere.currentSuper >= preservationSuper
			? 'You have already reached your Super number'
			: fiSuper - preSuperAmount <= 0
			? 0
			: Math.round(fiSuper - preSuperAmount);

	const superYears =
		typeof preSuperAmount === 'string' ||
		typeof amountToSave === 'string' ||
		preSuperAmount >= preservationSuper ||
		amountToSave <= 0
			? 0
			: Number(nper(formattedGrowthRate, startHere.incomePostTax, preSuperAmount, -fiSuper).toFixed(2));

	return {
		retireYear,
		preservationSuper,
		preSuperAmount,
		fiSuper,
		amountToSave,
		superYears,
	};
};

const workoutPreSuperNumbers = (growthRate, yearsUntilPreservationAge, lifestyleSpendYear, startHere) => {
	const formattedGrowthRate = parseFloat(growthRate) / 100;

	let numbers = [];
	for (let period = 0; period < 62; period++) {
		const original =
			pv(formattedGrowthRate, yearsUntilPreservationAge - period, -lifestyleSpendYear, 0) +
			pv(formattedGrowthRate, yearsUntilPreservationAge - period, -lifestyleSpendYear, 0) * formattedGrowthRate -
			lifestyleSpendYear;

		const value = fv(
			formattedGrowthRate,
			period,
			-Number(startHere.postTaxSavings),
			-Number(startHere.currentNetWorth),
		);

		numbers.push({
			period,
			original,
			value,
			total: original - value,
		});
	}

	return numbers;
};

export const calculatePreSuperValues = (startHere) => {
	const age = differenceInYears(new Date(), parse(startHere.dob, 'DD/MM/YYYY', new Date()));
	const preservationAge = 60;
	const yearsUntilPreservationAge = preservationAge - age;
	const preservationAgeReached = addYears(new Date(), yearsUntilPreservationAge).getFullYear();
	const postTaxSavingsRate =
		startHere.postTaxSavings === 0 || startHere.incomePostTax === 0
			? 0
			: ((startHere.postTaxSavings / startHere.incomePostTax) * 100).toFixed(2);
	const growthRate = parseFloat(startHere.investmentGrowthRate) - parseFloat(startHere.inflationRate);
	const lifestyleSpendYear = startHere.incomePostTax - startHere.postTaxSavings;
	const lifestyleSpendMonth = lifestyleSpendYear / 12;

	const preSuperTable = workoutPreSuperNumbers(growthRate, yearsUntilPreservationAge, lifestyleSpendYear, startHere);
	const preSuperPeriod = preSuperTable.find((preSuper) => preSuper.total <= lifestyleSpendYear);

	const preSuperNumber = yearsUntilPreservationAge - (preSuperPeriod ? preSuperPeriod.period : 0);
	const formattedGrowthRate = parseFloat(growthRate) / 100;

	const sustainableNetworthLater =
		preSuperNumber < 0 ? 0 : Math.round(pv(formattedGrowthRate, preSuperNumber, -lifestyleSpendYear, 0));
	const sustainableNetworthNow =
		preSuperNumber < 0 ? 0 : Math.round(pv(formattedGrowthRate, yearsUntilPreservationAge, -lifestyleSpendYear, 0));
	const moreSavings =
		sustainableNetworthLater - startHere.currentNetWorth <= 0
			? 'You have already reached FIRE'
			: Math.round(sustainableNetworthLater - startHere.currentNetWorth);
	const moreYears =
		moreSavings === 'You have already reached FIRE'
			? 0
			: moreSavings <= 0
			? 0
			: parseFloat(
					nper(
						formattedGrowthRate,
						startHere.postTaxSavings,
						startHere.currentNetWorth,
						-sustainableNetworthLater,
					).toFixed(2),
			  );
	const preservationAgeMinusPreSuperNumber = Math.round(yearsUntilPreservationAge - moreYears);
	const preSuperYear = format(addYears(new Date(), moreYears), 'YYYY');

	return {
		age,
		preservationAge,
		yearsUntilPreservationAge,
		preservationAgeReached,
		postTaxSavingsRate,
		growthRate,
		lifestyleSpendYear,
		lifestyleSpendMonth,
		sustainableNetworthLater,
		sustainableNetworthNow,
		moreSavings,
		moreYears,
		preservationAgeMinusPreSuperNumber,
		preSuperYear,
	};
};

export const calculateFireValues = (startHere, preSuper, withSuper) => {
	const fireYears =
		startHere.currentNetWorth >= preSuper.sustainableNetworthNow ||
		startHere.currentSuper >= withSuper.preservationSuper ||
		startHere.currentSuper + startHere.currentNetWorth >= withSuper.preservationSuper
			? 'You have already reached FIRE'
			: preSuper.moreYears + withSuper.superYears;

	const fireYear =
		fireYears === 'You have already reached FIRE'
			? new Date().getFullYear()
			: startHere.currentSuper >= withSuper.preservationSuper
			? preSuper.preSuperYear
			: addYears(new Date(), preSuper.moreYears + withSuper.superYears).getFullYear();
	const fireAge = differenceInYears(`12/31/${fireYear}`, parse(startHere.dob, 'DD/MM/YYYY', new Date()));

	return {
		fireYears,
		fireYear,
		fireAge,
	};
};

const createAmortizationSchedulePreSuperAscending = (currentNetWorth, preSuper) => {
	const date = new Date();
	const formattedGrowthRate = parseFloat(preSuper.growthRate) / 100;

	let total = 0;
	let period = 0;
	let schedule = [];
	do {
		let deposit = 0;
		let interest = 0;

		if (period > 0) {
			deposit = Math.round(
				pmt(formattedGrowthRate, preSuper.moreYears, +currentNetWorth, -preSuper.sustainableNetworthLater),
			);
			interest = Math.round(
				ipmt(formattedGrowthRate, period, preSuper.moreYears, -currentNetWorth, preSuper.sustainableNetworthLater),
			);

			date.setFullYear(date.getFullYear() + 1);
		}

		total = total + deposit + interest;
		schedule.push({
			period,
			deposit,
			interest,
			total,
			balance: total + Number(currentNetWorth),
			year: date.getFullYear(),
		});

		period++;
	} while (preSuper.moreYears > 0 && preSuper.moreYears - (period - 1) >= 0);

	return schedule;
};

const createAmortizationSchedulePreSuperDescending = (preSuper) => {
	const date = addYears(new Date(), preSuper.moreYears);
	const formattedGrowthRate = parseFloat(preSuper.growthRate) / 100;

	let balance = preSuper.sustainableNetworthLater;
	let interest = balance * formattedGrowthRate;

	let schedule = [
		{
			interest,
			balance,
			year: date.getFullYear(),
		},
	];

	do {
		date.setFullYear(date.getFullYear() + 1);
		balance = balance - preSuper.lifestyleSpendYear + interest;
		interest = balance * formattedGrowthRate;

		schedule.push({
			interest,
			balance,
			year: date.getFullYear(),
		});
	} while (preSuper.preservationAgeReached - date.getFullYear() > 0);

	return schedule;
};

const createAmortizationScheduleSuperAscending = (startHere, preSuper, superData) => {
	const preFillDate = new Date();
	const date = new Date();
	date.setFullYear(preSuper.preSuperYear);

	let schedule = [];

	if (preFillDate < date) {
		const formattedGrowthRate = parseFloat(preSuper.growthRate) / 100;
		const formattedSuperGuarantee = parseFloat(startHere.superGuarantee) / 100;

		let principle = startHere.currentSuper;
		let preInterest = principle * formattedGrowthRate;
		let balance = principle + preInterest;

		schedule = [
			{
				balance,
				deposit: principle,
				interest: preInterest,
				year: preFillDate.getFullYear(),
			},
		];

		const deposit = startHere.incomePreTax * formattedSuperGuarantee;
		while (preFillDate < date) {
			preInterest = (balance + deposit) * formattedGrowthRate;
			balance += deposit + preInterest;

			schedule.push({
				balance,
				deposit,
				interest: preInterest,
				year: preFillDate.getFullYear(),
			});

			preFillDate.setFullYear(preFillDate.getFullYear() + 1);
		}

		let total = 0;
		let period = 0;
		do {
			let deposit = 0;
			let interest = 0;

			if (period > 0) {
				deposit = Math.round(
					pmt(formattedGrowthRate, superData.superYears, +superData.preSuperAmount, -superData.fiSuper),
				);
				interest = Math.round(
					ipmt(formattedGrowthRate, period, superData.superYears, -superData.preSuperAmount, superData.fiSuper),
				);

				date.setFullYear(date.getFullYear() + 1);
			}

			total = total + deposit + interest;
			schedule.push({
				period,
				deposit,
				interest,
				total,
				balance: total + Number(superData.preSuperAmount),
				year: date.getFullYear(),
			});

			period++;
		} while (superData.superYears > 0 && superData.superYears - period >= -1);
	}

	return schedule;
};

const growingSuperSchedule = (currentSuper, preSuper, superData) => {
	let schedule = [];

	if (currentSuper < superData.preservationSuper) {
		let date = new Date();
		date.setFullYear(preSuper.preSuperYear);
		date = addYears(date, superData.superYears);

		const formattedGrowthRate = parseFloat(preSuper.growthRate) / 100;

		let principle = superData.fiSuper - superData.preSuperAmount <= 0 ? superData.preSuperAmount : superData.fiSuper;
		let interest = principle * formattedGrowthRate;
		let balance = principle + interest;

		schedule.push({
			principle,
			interest,
			balance,
			year: date.getFullYear(),
		});

		while (preSuper.preservationAgeReached - date.getFullYear() > 0) {
			date.setFullYear(date.getFullYear() + 1);
			principle = balance;
			interest = balance * formattedGrowthRate;
			balance = principle + interest;

			schedule.push({
				principle,
				interest,
				balance,
				year: date.getFullYear(),
			});
		}
	}

	return schedule;
};

export const getChartData = (startHere, preSuper, superData) => {
	const preSuperAmortizationSchedule = createAmortizationSchedulePreSuperAscending(startHere.currentNetWorth, preSuper);
	const preSuperAmortizationScheduleSpending = createAmortizationSchedulePreSuperDescending(preSuper);

	const superAmortizationSchedule = createAmortizationScheduleSuperAscending(startHere, preSuper, superData);
	const superAmortizationScheduleSpending = growingSuperSchedule(startHere.currentSuper, preSuper, superData);

	const preSuperDataSet = preSuperAmortizationSchedule.concat(preSuperAmortizationScheduleSpending);
	const preSuperDataSetData = preSuperDataSet.map((item) => item.balance);

	const superDataSet = superAmortizationSchedule.concat(superAmortizationScheduleSpending);
	const superDataSetData = superDataSet.map((item) => item.balance);

	const labels = [...new Set(preSuperDataSet.concat(superDataSet).map((item) => item.year))].sort();

	return {
		labels: labels,
		datasets: [
			{
				label: 'PreSuper',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: preSuperDataSetData,
			},
			{
				label: 'Super',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(192, 119, 75,0.4)',
				borderColor: 'rgba(192, 119, 75, 1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(192, 119, 75, 1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(192, 119, 75, 1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: superDataSetData,
			},
		],
	};
};
