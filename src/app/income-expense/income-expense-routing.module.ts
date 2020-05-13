import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StadisticComponent } from './stadistic/stadistic.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: StadisticComponent },
      { path: 'income-expense', component: IncomeExpenseComponent },
      { path: 'detail', component: DetailComponent },
    ]
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class IncomeExpenseRoutingModule { }
