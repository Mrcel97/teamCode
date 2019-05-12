// Components
import { AppComponent } from './app.component';
import { FeedComponent } from './interface/feed/feed.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InterfaceComponent } from './interface/interface.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './interface/projects/projects.component';
import { ProjectPagesComponent } from './interface/project-pages/project-pages.component';
import { StatisticsComponent } from './interface/statistics/statistics.component';
import { WorkspaceDeleteModalComponent } from './interface/projects/modals/workspace-delete-modal/workspace-delete-modal.component';
import { WorkspaceCreateModalComponent } from './interface/projects/modals/workspace-create-modal/workspace-create-modal.component';

// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule, ButtonsModule, WavesModule } from 'angular-bootstrap-md'

// Configs
import { firebaseConfig } from '../assets/configs/firebaseConfig';
import { AuthComponent } from './auth/auth.component';
import { GithubComponent } from './github/github.component';
import { IdeComponent } from './ide/ide.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    HomepageComponent,
    InterfaceComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectPagesComponent,
    StatisticsComponent,
    AuthComponent,
    GithubComponent,
    IdeComponent,
    WorkspaceDeleteModalComponent,
    WorkspaceCreateModalComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    TooltipModule,
    WavesModule,
    ModalModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  entryComponents: [ WorkspaceDeleteModalComponent, WorkspaceCreateModalComponent ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
