import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IncomeExpenseRoutingModule } from './income-expense-routing.module';

import { NgxLoadingModule } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { StadisticComponent } from './stadistic/stadistic.component';
import { DetailComponent } from './detail/detail.component';

import { TypeIncomeExpensePipe } from './pipes/type-income-expense.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StadisticComponent,
    DetailComponent,
    TypeIncomeExpensePipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    ChartsModule,
    SharedModule,
    IncomeExpenseRoutingModule
  ]
})
export class IncomeExpenseModule { }
