import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/model/project';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteProjectDialogComponent } from '../delete-project-dialog/delete-project-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent {

  form: FormGroup;
  project: Project;
  numOfExpenses: 0;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {project: Project}) {
    this.project = data.project;

      // set the values equal to the project fiedls
      this.form = this.fb.group({
        name: this.project.name,
        users: this.project.users,
      });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
