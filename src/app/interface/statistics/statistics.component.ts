import { Component, OnInit } from '@angular/core';

import { Workspace } from 'src/assets/model/workspace';
import { FirebaseUser } from './../../../assets/model/user';
import { File } from './../../../assets/model/file';

import { WorkspaceService } from './../../services/workspace.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  myUser: FirebaseUser;
  allWorkspaces: Array<Workspace>;

  localFiles: Array<File[]> = [];
  workspaceFilesLangs: Map<string, Array<string>> = new Map();

  constructor(
    public workspaceService:WorkspaceService,
    public authService:AuthService
  ) { }

  ngOnInit() {
    this.workspaceService.localWorkspaces.subscribe(workspaces => {
      if (workspaces == null) return;
      this.allWorkspaces = workspaces;
      this.organizeData();
    });
  }

  // Hardcoded Example Data
  public chartType: string = 'line';
  public chartType2: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#b0bec5'
      },
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public organizeData() {
    for (let workspace of this.allWorkspaces) {
      this.localFiles.push(workspace.files)
      this.workspaceFilesLangs.set(workspace.name, workspace.files.map(file => file.language && file.language));
    }
    // console.log(this.workspaceFilesLangs);
  }
}
