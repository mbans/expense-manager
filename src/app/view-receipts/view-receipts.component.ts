import { ProjectService } from './../services/project.service';
import { DeleteDialogComponent } from './../receipt/delete-dialog/delete-dialog.component';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../services/expense.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Expense } from '../model/expense';
import { EditDialogComponent } from '../receipt/edit-dialog/edit-dialog.component';
import { Project } from '../model/project';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-receipts.component.html',
  styleUrls: ['./view-receipts.component.scss']
})
export class ViewReceiptsComponent implements OnInit, OnDestroy, AfterViewInit {

  categorySub: Subscription;
  categories: string[] = [];

  currentProject: Project;
  currentProjectSub: Subscription;

  expensesSub: Subscription;
  expenses: Expense[] = [];
  dataSource: MatTableDataSource<any>;

  projectSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['date', 'category', 'amount', 'description', 'receipt', 'edit', 'delete'];

  constructor(private expenseService: ExpenseService,
              private projectService: ProjectService,
              private deleteDialog: MatDialog,
              private editDialog: MatDialog
              ) {


    // subsribe to current project that has been selected
    this.projectService.getCurrentProject().subscribe(project => {
      this.currentProject = project;
    });

    // Subsribe to expenses
    this.expensesSub = this.expenseService.getExpenses()
      .subscribe(expenses => {
        this.expenses = [];
        expenses.forEach(expense => {
        this.expenses.push(expense);
      });

      this.categorySub = this.expenseService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });

      // this.dataSource = new MatTableDataSource(this.expenses);
      this.dataSource.data = this.expenses;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;    });
  }

  openDeleteDialog(expense: Expense) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {expense: expense}
    });

    dialogRef.afterClosed().subscribe(exp => {
      if (exp) {
        this.expenseService.delete(exp);
      } else {
        console.log('Closed the delete');
      }
    });
  }

  openEditDialog(expense: Expense) {
    console.log('editing ' + JSON.stringify(expense));
    const dialogRef = this.editDialog.open(EditDialogComponent, {
      width: '350px',
      data: {expense: expense, categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(exp => {
      if (exp) {
        console.log('Editing ' + JSON.stringify(exp));
        this.expenseService.update(exp, this.categories);

        // this.expenseService.upsert(exp, this.categories);
      } else {
        console.log('Cancelled the edit');
      }
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Expense>();

    // subsribe to latest project
    this.projectSub = this.projectService.getCurrentProject().subscribe(project =>  {
      this.currentProject = project;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }

    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }

  getTotalCost() {
    return this.dataSource.filteredData.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

}
