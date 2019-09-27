import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Project } from '../model/project';
import { AuthService } from '../core/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProjectData } from '../model/project-data';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects$: Observable<Project[]>;
  currentProjectId: string;
  private currentProject = new BehaviorSubject<Project>(null);

  /**
   * Switch to the given project
   */
  switchProject(projectId: string) {
    this.currentProjectId = projectId;

    this.db.object<Project>('/projects/' + projectId).snapshotChanges()
      .subscribe(p => {
        const project: Project = {uid: p.payload.key, ...p.payload.val()};
        console.log('Publishing the new current project ' + project.name);
        this.currentProject.next(project);
      });
  }

  getCurrentProject(): Observable<Project> {
    return this.currentProject;
  }

  constructor(private auth: AuthService,
              private db: AngularFireDatabase,
              private router: Router) {

    // sets up the project$ for the current user
    this.auth.user$.subscribe(user => {
        if (!user) {
          return;
        }

        // set up the new observable based on the latest user data
        this.projects$ = this.db.list('/projects', ref => ref.orderByChild('owner').equalTo(auth.user.uid))
          .snapshotChanges()
          .pipe(
            map(allProjects =>  {

              // map function here is used to invoke callback function on
              // each item in the array - it is *not* the rxjs operator we are using here
              const enriched = allProjects.map( project => {
                const { uid, data } = asProject(project);
                return { uid, ...data } as Project;
              });

              if (enriched && enriched.length > 0) {
                  console.log('Publishing currently selected project ' + enriched[0].name);
                  this.currentProject.next(enriched[0]);
              }

              return enriched;
            }
            ));
          });
  }

  addProject(data: ProjectData) {
    // construct our project object

    let users: Array<string> = [];
    if (data.users) {
      users = data.users.split(',');
    }

    const projectData: Project = {
        name: data.projectName,
        owner: this.auth.user.uid,
        expenses: [],
        users: users
    };

    // check if there is a project with that name already
    // this.db.list('projects').get

    // this.db.list<Project>('/projects').push(projectData);

    console.log('saving ' + JSON.stringify(projectData));
    this.db.list<Project>('/projects').push(projectData);
  }

  addUserToProject(projectName: string, {emailAddress: string, admin: boolean}) {
  }

  removeUserFromProject(projectName: string, email: string) {
  }

  deleteProject(project: Project) {
    return this.db.object('/projects/' + project.uid).remove()
      .then(() => console.log('Deleted project ' + project.uid + '/' + project.name +  ' successfully.'));
  }

}

function asProject(project): {uid, data} {
  const data = project.payload.val();
  const uid = project.payload.key;
  return { uid, data };
}

