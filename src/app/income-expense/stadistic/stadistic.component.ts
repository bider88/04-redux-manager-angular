import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense, incomeExpenseType } from 'src/app/models/income-expense/income-expense.interface';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.scss']
})
export class StadisticComponent implements OnInit {

  income = 0;
  expense = 0;
  totalIncome = 0;
  totalExpense = 0;

  public doughnutChartLabels: Label[] = ['Entradas', 'Salidas'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.listenStore();
  }

  listenStore() {
    this.store.select('incomeExpense').subscribe(
      ({ items }) => this.generateStadistic(items)
    );
  }

  generateStadistic(items: IncomeExpense[]) {
    items.forEach(item => {
      if (item.type === 'income' as incomeExpenseType) {
        this.totalIncome += item.mount;
        this.income++;
      } else {
        this.totalExpense += item.mount;
        this.expense++;
      }
    });

    this.doughnutChartData = [ [ this.totalIncome, this.totalExpense ] ];
  }

}
