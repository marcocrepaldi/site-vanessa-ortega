export interface FinancialData {
  initialInvestment: number;
  currentAge: number;
  retirementAge: number;
  desiredMonthlyIncome: number;
  expectedLifespan: number;
}

export interface ChartDataPoint {
  age: number;
  wealth: number;
}

export interface Insights {
  nestEggNeeded: number;
  annualSavingsNeeded: number;
  monthlySavingsNeeded: number;
  totalYearsToSave: number;
  totalYearsInRetirement: number;
}
