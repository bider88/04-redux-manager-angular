import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Loading
import { NgxLoadingModule } from 'ngx-loading';

// Chart.js
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { StadisticComponent } from './income-expense/stadistic/stadistic.component';
import { DetailComponent } from './income-expense/detail/detail.component';

import { environment } from '../environments/environment';
import { TypeIncomeExpensePipe } from './income-expense/pipes/type-income-expense.pipe';
import { SortPipe } from './income-expense/pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncomeExpenseComponent,
    StadisticComponent,
    DetailComponent,
    TypeIncomeExpensePipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    NgxLoadingModule.forRoot({}),
    ChartsModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
