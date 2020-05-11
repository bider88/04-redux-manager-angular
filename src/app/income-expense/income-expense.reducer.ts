
import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './income-expense.actions';
import { IncomeExpense } from '../models/income-expense/income-expense.interface';

export interface State {
  items: IncomeExpense[];
}

export const initialState: State = {
  items: [],
};

const incomeExpenseInternalReducer = createReducer(initialState,

    on(setItems, (state, props) => ({ ...state, items: [ ...props.items ]})),
    on(unsetItems, state => ({ ...state, items: []})),

);

export function incomeExpenseReducer(state, action) {
    return incomeExpenseInternalReducer(state, action);
}
