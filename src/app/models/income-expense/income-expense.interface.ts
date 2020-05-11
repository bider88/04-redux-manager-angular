export type incomeExpenseType = 'income' | 'expense';

export class IncomeExpenseInterface {

  constructor(
    public description: string,
    public mount: number,
    public type: incomeExpenseType,
    public uid?: string,
  ) { }

}
