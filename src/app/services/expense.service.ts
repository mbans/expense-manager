import { ProjectService } from './project.service';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, Subscription, EMPTY } from 'rxjs';
import { Expense } from '../model/expense';
import { Router } from '@angular/router';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService implements OnInit, OnDestroy {

  projectSub: Subscription;

  constructor(private db: AngularFireDatabase,
              private projectService: ProjectService,
              private router: Router) {
  }

  /**
   * Returns an observable of expense[] for the currently selected project
   *
   * Retrieve the project observable
   * a) switch to expenses by querying firebase
   * b) map each of the expenses which are firebase objects to Expenses with the key/uid set
   */
  getExpenses(): Observable<Expense[]> {
    return this.projectService.getCurrentProject()
    .pipe(

      // switch from project obs to expenses[] obs
      switchMap(project => {
        if (!project) {
          return EMPTY;
        }

        const projectId = project.uid;
        return this.db.list('projects/' + projectId + '/expenses').snapshotChanges();
      }),

      // map the content of each exp to enrich with the uid (id) from the db
      map(expenses =>  {
            const newExpenses: Expense[] = expenses.map(e => {
            const data = e.payload.val();
            const key = e.payload.key;
            return { key, ...data } as Expense;           // or {key, ...data} in case data is Obj
          });
          return newExpenses;
      })
    );
  }

  ngOnInit() {
  }

  addExpense(project: Project, expense: Expense, categories: string[]) {
    const exp: any = expense;
    exp['date'] = expense.date.toString();

    const existingCat = categories.filter(cat => cat['name'] === expense.category);

    if (existingCat.length === 0) {
      console.log('Creating category => ' + expense.category);
      this.db.list('/categories').push({name: expense.category});
    }

    console.log('Adding expense to project ' + project.name);
    this.db.list('projects/' + project.uid + '/expenses').push(exp);
    this.router.navigate(['/view']);
  }

  update(expense: Expense, categories: string[]) {
    console.log('Updating to new values ' + JSON.stringify(expense));
    if (!expense.key) {
      return;
    }

    this.db.object('/projects/' + expense.projectId + '/expenses/' + expense.key).update(expense);
    this.router.navigate(['/view']);
  }

  save(expense: Expense, categories: string[]): void {
    // Save the 'date' as the string equivalent as firebase does not
    // support 'date' object type.
    const exp: any = expense;
    exp['date'] = expense.date.toString();

    const existingCat = categories.filter(cat => cat['name'] === expense.category);

    if (existingCat.length === 0) {
      console.log('Creating category => ' + expense.category);
      this.db.list('/categories').push({name: expense.category});
    }

    this.db.list('/expenses').push(exp);
    this.router.navigate(['/view']);
  }

  async delete(expense: Expense) {
    return this.db.object('/projects/' + expense.projectId + '/expenses/' + expense.key).remove()
      .then(() => console.log('Deleted expense ' + JSON.stringify(expense) + ' successfully.'));
  }

  upsert(exp: Expense, categories: string[]): any {
    return this.save(exp, categories);
  }

  getCategories(): Observable<string[]> {
    return this.db.list<string>('/categories').valueChanges();
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
}
