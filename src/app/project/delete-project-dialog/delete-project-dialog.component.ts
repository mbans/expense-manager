import { Project } from './../../model/project';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent {

  project: Project;
  numOfExpenses: 0;

  constructor(public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {project: Project}) {
      this.project = data.project;

      if (data.project.expenses) {
        console.log('number of expenses = ' + JSON.stringify(data.project.expenses));
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
