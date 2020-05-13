import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeExpense, incomeExpenseType } from 'src/app/models/income-expense/income-expense.interface';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/util/toast.service';
import { ARE_YOU_SURE_TO_DELETE, firebaseMessages, AN_ERROR_HAS_OCURRED, DELETE_SUCCESSFULLY } from 'src/app/models/constants/constant';
import { IncomeExpenseService } from '../services/income-expense.service';
import { AppStateIncomeExpense } from '../income-expense.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  incomeExpenseList: IncomeExpense[] = [];
  subscriptions: Subscription[] = [];
  readonly income: incomeExpenseType = 'income';
  readonly expense: incomeExpenseType = 'expense';

  constructor(
    private store: Store<AppStateIncomeExpense>,
    private toastService: ToastService,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit(): void {
    this.getIncomeExpenseList();
  }

  getIncomeExpenseList() {
    const subscription = this.store.select('incomeExpense').subscribe(
      ({ items }) => this.incomeExpenseList = items
    );
    this.subscriptions.push(subscription);
  }

  deleteItem(item: IncomeExpense) {
    this.toastService.showQuestion({
      title: ARE_YOU_SURE_TO_DELETE,
      message: item.description ? item.description : '',
    }, () => {
      const subscription = this.incomeExpenseService.delete(item).subscribe(
        () => this.toastService.showSuccess({
          title: DELETE_SUCCESSFULLY,
          message: ''
        }),
        error => this.toastService.showError({
          title: AN_ERROR_HAS_OCURRED,
          message: firebaseMessages(error)
        })
      );
      this.subscriptions.push(subscription);
    });
  }

}
