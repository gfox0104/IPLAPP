export class Dashboard {
  ProfitLoss: number = 0;
  Expenses: number = 0;
  Income: number = 0;
}
export class Dashboard_Input_DTO {
  ProfitLossType: number = 0;
  ProfitLossDate: Date = null;
  IsProfitLossChanges: boolean = false;

  ExpensesType: number = 0;
  ExpensesDate: Date = null;
  IsExpensesTypeChanges: boolean = false;

  IncomeType: number = 0;
  IncomeDate: Date = null;
  IsIncomeTypeChanges: boolean = false;

  UserID;
}

export class ProfitAndLoss {
  TotalProfitAndLoss: Number = 0;
  TotalIncome: Number = 0;
  IncomeWidth: any;
  TotalExpenses: Number = 0;
  ExpensesWidth: any;
}
