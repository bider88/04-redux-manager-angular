import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IncomeExpenseService } from '../income-expense/services/income-expense.service';
import { setItems, unsetItems } from '../income-expense/income-expense.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit(): void {
    this.listenIncomeExpenseList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(unsetItems());
  }

  listenIncomeExpenseList() {
    const subscription = this.store.select('user').pipe(
      filter(({ user }) => user !== null)
    ).subscribe(
      ({ user }) => {
        this.incomeExpenseService.user = user;
        this.getIncomeExpenseList();
      }
    );
    this.subscriptions.push(subscription);
  }

  getIncomeExpenseList() {
    const subscription = this.incomeExpenseService.initIncomeExpenseListListener().subscribe(
      items => this.store.dispatch(setItems({ items }))
    );
    this.subscriptions.push(subscription);
  }

}
