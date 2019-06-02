import { Component, OnInit } from '@angular/core';

import { Workspace } from 'src/assets/model/workspace';
import { FirebaseUser } from './../../../assets/model/user';
import { File } from './../../../assets/model/file';

import { WorkspaceService } from './../../services/workspace.service';
import { AuthService } from './../../services/auth.service';
import { StatisticsService } from './../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  myUser: FirebaseUser;
  allWorkspaces: Array<Workspace>;
  filesNames: Array<string> = [];
  filesAmount: Array<number> = [];
  languagesNames: Array<string> = [];
  languagesAmount: Array<number> = [];

  localFiles: Array<File[]> = [];
  workspaceFilesLangs: Map<string, Array<string>> = new Map();

  constructor(
    public workspaceService:WorkspaceService,
    public authService:AuthService,
    private statisticsService:StatisticsService
  ) {
    this.authService.user$.subscribe(user => {
      if (user == null) return;
      this.statisticsService.loadFileStatistics(user.uid);
      this.statisticsService.loadLanguagesStatistics(user.uid);
    });

    this.statisticsService.fileStatistics.subscribe(fileStatistics => {
      this.filesNames = [];
      this.filesAmount = [];
      typeof(fileStatistics);

      fileStatistics.forEach((value: number, key: string) => {
        if (value != 0) {
          this.filesNames.push(key.split(' ').length > 1 ? key.replace(' ', '_') : key);
          this.filesAmount.push(value);
        }
      });
      this.loadChartFilesData();
      console.log('Files: ', this.filesAmount);
      console.log('Files: ', this.filesNames);
    });

    this.statisticsService.languageStatistics.subscribe(languageStatistics => {
      this.languagesNames = [];
      this.languagesAmount = [];
      
      languageStatistics.forEach((value: number, key: string) => {
        if (value != 0) {
          this.languagesNames.push(key.split('.').length > 1 ? key.replace('.','') : key);
          this.languagesAmount.push(value);
        }
      });
      this.loadChartlanguagesData();
      console.log('Languages: ', this.languagesAmount);
    });
  }

  ngOnInit() {
  }

  // Hardcoded Example Data
  public chartType: string = 'line';
  public chartType2: string = 'bar';

  public chartFilesDataset: Array<any>;
  public chartLanguagesDataset: Array<any>;

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

  private loadChartFilesData() {
    this.chartFilesDataset = [
      { data: this.filesAmount, label: 'Nº of Files/Project' }
    ]
  }

  private loadChartlanguagesData() {
    this.chartLanguagesDataset = [
      { data: this.languagesAmount, label: 'Nº of files/Language' }
    ]
  }
}
