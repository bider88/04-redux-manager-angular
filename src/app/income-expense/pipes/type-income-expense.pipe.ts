import { Pipe, PipeTransform } from '@angular/core';
import { incomeExpenseType } from 'src/app/models/income-expense/income-expense.interface';

@Pipe({
  name: 'typeIncomeExpense'
})
export class TypeIncomeExpensePipe implements PipeTransform {

  transform(type: incomeExpenseType): string {
    switch (type) {
      case 'income':
        return 'Ingreso';
      case 'expense':
        return 'Salida';
    }
  }

}
