import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard-routing.module';
import { AuthGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent, children: [ ...dashboardRoutes ], canActivate: [ AuthGuard ] },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
