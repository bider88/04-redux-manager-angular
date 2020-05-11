import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from 'src/app/models/income-expense/income-expense.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: IncomeExpense[]): IncomeExpense[] {
    return items.slice().sort((a, b) => a.type as string === 'income' ? -1 : 1 );
  }

}
