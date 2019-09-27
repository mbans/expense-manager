import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppUser } from '../model/user';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit , AfterViewInit {

  user: AppUser;

  constructor(private auth: AuthService,
              private projectService: ProjectService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    // if (this.select) {
    //   console.log('Mat Select change...' + JSON.stringify(this.select));
    // }

    // this.select.optionSelectionChanges.subscribe(res => {
    //   console.log(res);
    // });
}

  switchProject(projectId: string) {
    this.projectService.switchProject(projectId);
  }

  logout() {
    this.auth.logout();
    this.user = null;
  }


  ngOnInit() {
  }

}
