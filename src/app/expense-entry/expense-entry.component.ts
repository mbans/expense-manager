import { ProjectService } from './../services/project.service';
import { Expense } from './../model/expense';
import { ExpenseService } from './../services/expense.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, Subscription} from 'rxjs';
import { switchMap, map, finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { inspect } from 'util'; // or directly
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Project } from '../model/project';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories: string[] = [];
  categorySub: Subscription;

  currentProjectSub: Subscription;
  currentProject: Project;

  selectedFile: File;
  selectedFileName: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  successfulUpload: boolean;

  uploadProgress$: Observable<number>;
  downloadURL$: Observable<string>;

  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              private expenseService: ExpenseService,
              private storage: AngularFireStorage) { }

    ngOnInit() {

      // listen for updates on the current project that has been selected
      this.currentProjectSub = this.projectService.getCurrentProject().subscribe(project => {
        if (project) {
          this.currentProject = project;
        }
      });

      this.categorySub = this.expenseService.getCategories().subscribe(categories => {
        this.categories = categories;
      });

    this.form = this.fb.group({
        name: '',
        date: new Date(),
        category: '',
        amount: 0,
        description: '',
        photo: '',
    });
  }

  startUpload(event: any): Observable<UploadTaskSnapshot> {
      const file: File = this.selectedFile;

      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
      }

      const path = `receipts/${new Date().getTime()}_${file.name}`;
      this.ref = this.storage.ref(path);
      this.task = this.ref.put(file);
      this.uploadProgress$ = this.task.percentageChanges();

      // Once the UploadTask has completed we then retrieve the download URL
      return this.task.snapshotChanges();
    }

  /**
   * Submitted from the UI
   */
  submit(expense: Expense) {

    // set the project id
    expense.projectId = this.currentProject.uid;

    if (!expense.photo) {
      this.expenseService.addExpense(this.currentProject , expense, this.categories);
      // this.expenseService.save(expense, this.categories);
      return;
    }

    // upload photo, then submit the entry to be saved once we get back the downloadURL for the photo
    this.startUpload(this.selectedFile).pipe(
      finalize(() => {
          this.downloadURL$ = this.ref.getDownloadURL();
          this.downloadURL$.subscribe(
            downloadURl => {
              expense.photo = downloadURl;
              console.log('Ready to upload => ' + JSON.stringify(expense));
              this.expenseService.save(expense, this.categories);
            }
          );
        })
    )
    .subscribe();
  }

  onFileSelectedEvent(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file ' + JSON.stringify(event));
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.selectedFile = inputNode.files[0];
    console.log('selectedFile = '  + this.selectedFile.name);
  }

  get date() {
    return this.form.get('date');
  }

  get category() {
    return this.form.get('category');
  }

  get amount() {
    return this.form.get('amount');
  }

  get description() {
    return this.form.get('description');
  }

  get photo() {
    return this.form.get('photo');
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.currentProjectSub.unsubscribe();
  }
}
