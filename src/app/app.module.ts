import { ProjectService } from './services/project.service';
import { AuthService } from './core/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewReceiptsComponent } from './view-receipts/view-receipts.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ExpenseService } from './services/expense.service';
import { DropZoneDirective } from './drop-zone.directive';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from './material/material.module';
import { DeleteDialogComponent } from './receipt/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './receipt/edit-dialog/edit-dialog.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ReportDashboardComponent } from './reports/report-dashboard/report-dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UsersComponent } from './users/users.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { HomeComponent } from './home/home.component';
import { DeleteProjectDialogComponent } from './project/delete-project-dialog/delete-project-dialog.component';
import { EditProjectDialogComponent } from './project/edit-project-dialog/edit-project-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewReceiptsComponent,
    NavBarComponent,
    ExpenseEntryComponent,
    DropZoneDirective,
    DeleteDialogComponent,
    EditDialogComponent,
    ReportDashboardComponent,
    LoginComponent,
    CategoriesComponent,
    UnauthorizedComponent,
    UsersComponent,
    ProjectSettingsComponent,
    HomeComponent,
    DeleteProjectDialogComponent,
    EditProjectDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [ProjectService,
              ExpenseService,
              AngularFireStorage,
              AuthService,
              { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
            ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent,
                    DeleteProjectDialogComponent,
                    EditProjectDialogComponent,
                    EditDialogComponent]
})
export class AppModule { }
