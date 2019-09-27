import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { AuthService } from '../core/auth.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent
  ],
  exports: [
    AdminComponent
  ],
  providers: [ExpenseService, AuthService]
})
export class AdminModule { }
