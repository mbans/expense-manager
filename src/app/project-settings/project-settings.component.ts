import { DeleteProjectDialogComponent } from './../project/delete-project-dialog/delete-project-dialog.component';
import { ProjectData } from './../model/project-data';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { DeleteDialogComponent } from '../receipt/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { EditProjectDialogComponent } from '../project/edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  form: FormGroup;
  add = false;
  editProject: Project;

  constructor(private projectService: ProjectService,
              private deleteProjectDialog: MatDialog,
              private editProjectDialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
        projectName: '',
        users: ''
    });
  }

  submit(data: ProjectData) {
    this.projectService.addProject(data);
    this.add = false;
  }

  openDeleteDialog(project: Project) {
    const dialogRef = this.deleteProjectDialog.open(DeleteProjectDialogComponent, {
      width: '250px',
      data: {project: project}
    });

    dialogRef.afterClosed().subscribe(pro => {
      if (pro) {
        this.projectService.deleteProject(project);
      }
    });
  }

  openEditDialog(project: Project) {
    console.log('Editing ' + JSON.stringify(project));

    const dialogRef = this.editProjectDialog.open(EditProjectDialogComponent, {
      width: '250px',
      data: {project: project}
    });

    dialogRef.afterClosed().subscribe(pro => {
      if (pro) {
        console.log('Save project edit');
        // this.projectService.deleteProject(project);
      } else {
        console.log('No project');
      }
    });
  }

}
