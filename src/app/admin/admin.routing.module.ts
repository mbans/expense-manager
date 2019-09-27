import { AuthAdminGuard } from './../guards/auth-admin-guard.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { UsersComponent } from '../users/users.component';
import { CategoriesComponent } from '../categories/categories.component';

const adminRoutes: Routes = [
  { path: 'admin',  component: AdminComponent ,
    children: [
    {
      path: 'login',
      component: LoginComponent
      // canActivate: [AuthGuard]
    },

    // {
    //   path: 'users',
    //   component: UsersComponent,
    //   canActivate: [AuthGuard, AuthAdminGuard]
    // },

    {
      path: 'categories',
      component: CategoriesComponent,
      canActivate: [AuthGuard, AuthAdminGuard]
    }


  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
