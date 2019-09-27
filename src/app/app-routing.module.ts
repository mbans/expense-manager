import { HomeComponent } from './home/home.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CategoriesComponent } from './categories/categories.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './admin/login/login.component';
import { ViewReceiptsComponent } from './view-receipts/view-receipts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ReportDashboardComponent } from './reports/report-dashboard/report-dashboard.component';
import { AuthAdminGuard } from './guards/auth-admin-guard.service';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'entry',
    component: ExpenseEntryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'view',
    component: ViewReceiptsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'settings',
    component: ProjectSettingsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'reports',
    component: ReportDashboardComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
