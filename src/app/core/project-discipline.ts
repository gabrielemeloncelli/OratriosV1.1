import { Project } from './project';
import { Discipline } from './discipline';

export class ProjectDiscipline{
  constructor(public id: number, public project: Project, public discipline: Discipline){}
}
