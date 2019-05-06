import { Project } from '@stackblitz/sdk/typings/interfaces';

export class IProject implements Project {
  constructor(
    public files: { [path: string]: string; },
    public title: string,
    public description: string,
    public template: string,
    public tags?: string[],
    public dependencies?: { [name: string]: string; },
    public settings?: { compile?: { trigger?: string; action?: string; clearConsole?: boolean; }; }
  ) {}
}
