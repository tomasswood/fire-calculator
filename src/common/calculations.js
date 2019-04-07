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
		preSuperAmount >= preservationSuper
			? 0
			: amountToSave <= 0
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
	const postTaxSavingsRate = ((startHere.postTaxSavings / startHere.incomePostTax) * 100).toFixed(2);
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

const createAmortizationScheduleAscending = (currentNetWorth, preSuper) => {
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

const createAmortizationScheduleDescending = (preSuper) => {
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

export const getChartData = (currentNetWorth, preSuper) => {
	const preSuperAmortizationSchedule = createAmortizationScheduleAscending(currentNetWorth, preSuper);
	const preSuperAmortizationScheduleSpending = createAmortizationScheduleDescending(preSuper);

	console.log(preSuperAmortizationSchedule);
	console.log(preSuperAmortizationScheduleSpending);

	const preSuperDataSet = preSuperAmortizationSchedule.concat(preSuperAmortizationScheduleSpending);
	const labels = preSuperDataSet.map((item) => item.year);
	const preSuperDataSetData = preSuperDataSet.map((item) => item.balance);

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
		],
	};
};
