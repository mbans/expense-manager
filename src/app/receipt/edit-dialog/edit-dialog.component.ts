import { AppModule } from './../../app.module';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Expense } from 'src/app/model/expense';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  categorySub: Subscription;
  categories: string[] = [];

  key: string;
  expense: Expense;

  // externalise the form groups
  date = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  description = new FormControl('');
  projectId = new FormControl('', Validators.required);

  constructor(
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {expense: Expense}) {

      this.expense = (data.expense) ? data.expense : {};

      // const photo = (this.expense) ? this.expense.photo : '';
      this.form = this.fb.group({
        date: this.date,
        category: this.category,
        amount: this.amount,
        description: this.description,
        photo: this.expense.photo,
        projectId: this.expense.projectId
      });

      if (this.expense) {
          this.expense = data.expense;
          this.key = data.expense.key;
          this.form.setValue({
                          date: new Date(this.expense.date),
                          category: this.expense.category,
                          amount: this.expense.amount,
                          description: this.expense.description,
                          photo: '',
                          projectId: this.expense.projectId
          });
      } else {
        this.expense = {};
      }
      this.onChanges();
    }

    onChanges(): void {
      // The value from the form makes up the expense
      // we want to insert the key back in as the vale we omit is what will be received by
      // the component that opens the dialog (the expense-view)
      this.form.valueChanges.subscribe(exp => {
        const key = this.key;
        const expData = exp;
        this.expense = {key, ...expData};
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.categorySub = this.expenseService.getCategories().subscribe(categories => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }
}
