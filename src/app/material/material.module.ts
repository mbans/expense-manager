import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MatInputModule,
         MatButtonModule,
         MatSelectModule,
         MatToolbarModule,
         MatMenuModule,
         MatCheckboxModule,
         MatFormFieldModule,
         MatDatepickerModule,
         MatTableModule,
         MatSortModule,
         MatPaginatorModule,
         MatAutocompleteModule,
         MatNativeDateModule,
         MatDialogModule,
         MatProgressSpinnerModule,
         MatProgressBarModule,
         MatCardModule,
         MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ]})
export class MaterialModule { }
