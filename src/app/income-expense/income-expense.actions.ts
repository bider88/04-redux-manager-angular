import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense/income-expense.interface';

export const setItems = createAction('[IncomeExpense] Set Items', props<{items: IncomeExpense[]}>());
export const unsetItems = createAction('[IncomeExpense] Unset Items');
