import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Project } from './project';
import { Discipline } from './discipline';
import { ProjectDiscipline } from './project-discipline';

@Injectable()
export class ProjectDisciplineStoreService {
  private BASE_URL = '/Oratrios.Api/api/projectdiscipline';
  private PRJ_BASE_URL = '/Oratrios.Api/api/projects';
  constructor(private _http: Http) {}

  selectUser(databaseUserName: string): Observable<Project[]> {
    const result = new Subject<Array<Project>>();
    this._http
        .get(this.PRJ_BASE_URL + '?databaseUserName=' + encodeURIComponent(databaseUserName))
        .map((res: Response) => res.json())
        .subscribe(res => {
          result.next(res.map((pos: any) => this.mapProject(pos)));
        });
    return result.asObservable();

  }

  selectProject(projectCode: string, databaseUserName: string): Observable<ProjectDiscipline[]> {
    const result = new Subject<Array<ProjectDiscipline>>();
    this._http
        .get(this.BASE_URL + '/project?projectCode=' + encodeURIComponent(projectCode) +
        '&databaseUserName=' + databaseUserName)
        .map((res: Response) => res.json())
        .subscribe(res => {
          result.next(res.map((pos: any) => this.mapProjectDiscipline(pos)));
        });
    return result.asObservable();
}

 selectDiscipline(projectId: number, disciplineCode: string): Observable<ProjectDiscipline> {
   const result = new Subject<ProjectDiscipline>();
   this._http.get(this.BASE_URL + '/' + projectId + '/' + disciplineCode)
   .map((res: Response) => res.json())
   .subscribe(dis => result.next(this.mapProjectDiscipline(dis)));
   return result.asObservable();
 }


  mapProjectDiscipline(res: any): ProjectDiscipline {
    const resultProject = new Project(res.project.id, res.project.code, res.project.description);
    const resultDiscipline = new Discipline(res.discipline.id, res.discipline.code);
    return new ProjectDiscipline(res.id, resultProject, resultDiscipline);
  }

  mapProject(res: any): Project {
    return new Project(0, res.code, res.description);
  }

}
