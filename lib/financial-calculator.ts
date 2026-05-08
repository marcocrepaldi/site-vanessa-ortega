import type { FinancialData, ChartDataPoint, Insights } from './types';

export function calculateFinancials(data: FinancialData): { chartData: ChartDataPoint[], insights: Insights } {
  const {
    currentAge,
    retirementAge,
    desiredMonthlyIncome,
    expectedLifespan,
    initialInvestment,
  } = data;

  const annualReturnRatePercent = 6;
  const isPerpetual = false; // Default to non-perpetual (deplete nest egg over time)

  if (retirementAge <= currentAge || expectedLifespan <= retirementAge) {
    return { chartData: [], insights: { nestEggNeeded: 0, annualSavingsNeeded: 0, monthlySavingsNeeded: 0, totalYearsToSave: 0, totalYearsInRetirement: 0 }};
  }

  const annualReturnRate = annualReturnRatePercent / 100;
  const annualIncomeNeeded = desiredMonthlyIncome * 12;
  const yearsToSave = retirementAge - currentAge;
  const yearsInRetirement = expectedLifespan - retirementAge;

  let nestEggNeeded = 0;
  if (annualReturnRate > 0) {
    if (isPerpetual) {
      nestEggNeeded = annualIncomeNeeded / annualReturnRate;
    } else {
      nestEggNeeded = annualIncomeNeeded * ((1 - Math.pow(1 + annualReturnRate, -yearsInRetirement)) / annualReturnRate);
    }
  } else {
    nestEggNeeded = annualIncomeNeeded * yearsInRetirement;
  }
  
  const fvInitialInvestment = initialInvestment * Math.pow(1 + annualReturnRate, yearsToSave);
  const fvFromSavingsNeeded = nestEggNeeded - fvInitialInvestment;

  let annualSavingsNeeded = 0;
  if (fvFromSavingsNeeded > 0) {
    if (annualReturnRate > 0) {
      const fvFactor = (Math.pow(1 + annualReturnRate, yearsToSave) - 1) / annualReturnRate;
      annualSavingsNeeded = fvFromSavingsNeeded / fvFactor;
    } else {
      annualSavingsNeeded = fvFromSavingsNeeded / yearsToSave;
    }
  }
  
  annualSavingsNeeded = Math.max(0, annualSavingsNeeded);
  const monthlySavingsNeeded = annualSavingsNeeded / 12;

  const accumulationData: ChartDataPoint[] = [];
  for (let age = currentAge; age <= retirementAge; age++) {
    const yearsElapsed = age - currentAge;
    const fvInitial = initialInvestment * Math.pow(1 + annualReturnRate, yearsElapsed);
    let fvSavings = 0;
    if(annualReturnRate > 0) {
        fvSavings = annualSavingsNeeded * ((Math.pow(1 + annualReturnRate, yearsElapsed) - 1) / annualReturnRate);
    } else {
        fvSavings = annualSavingsNeeded * yearsElapsed;
    }
    const wealth = fvInitial + fvSavings;
    accumulationData.push({ age, wealth: Math.round(wealth) });
  }

  const decumulationData: ChartDataPoint[] = [];
   const wealthAtRetirement = accumulationData[accumulationData.length - 1]?.wealth || nestEggNeeded;
  let runningWealth = wealthAtRetirement;

  for (let age = retirementAge + 1; age <= expectedLifespan; age++) {
    if (isPerpetual) {
      runningWealth = runningWealth * (1 + annualReturnRate) - annualIncomeNeeded;
      decumulationData.push({ age, wealth: Math.round(runningWealth) });
    } else {
      runningWealth = runningWealth * (1 + annualReturnRate) - annualIncomeNeeded;
      decumulationData.push({ age, wealth: Math.round(Math.max(0, runningWealth)) });
    }
  }

  const chartData = [...accumulationData, ...decumulationData];

  const insights: Insights = {
    nestEggNeeded: Math.round(nestEggNeeded),
    annualSavingsNeeded: Math.round(annualSavingsNeeded),
    monthlySavingsNeeded: Math.round(monthlySavingsNeeded),
    totalYearsToSave: yearsToSave,
    totalYearsInRetirement: yearsInRetirement,
  };

  return { chartData, insights };
}
