export default interface StartHereProps {
	classes?: any;
	updateStoreValue: Function;
	dob?: string;
	currentNetWorth?: number;
	currentSuper?: number;
	superGuarantee?: number;
	investmentGrowthRate?: number;
	inflationRate?: number;
	incomePreTax?: number;
	incomePostTax?: number;
	postTaxSavings?: number;
	fireYears: number | string;
	fireYear: number | string;
	fireAge: number;
}
