// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { StadisticComponent } from '../income-expense/stadistic/stadistic.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { DetailComponent } from '../income-expense/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StadisticComponent },
  { path: 'income-expense', component: IncomeExpenseComponent },
  { path: 'detail', component: DetailComponent },
];

// @NgModule({
//   imports: [routes],
//   exports: []
// })
// export class DashboardRoutingModule { }
