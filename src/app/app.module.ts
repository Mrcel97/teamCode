// Components
import { AppComponent } from './app.component';
import { FeedComponent } from './interface/feed/feed.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InterfaceComponent } from './interface/interface.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './interface/projects/projects.component';
import { ProjectPagesComponent } from './interface/project-pages/project-pages.component';
import { StatisticsComponent } from './interface/statistics/statistics.component';

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
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule, ButtonsModule, WavesModule } from 'angular-bootstrap-md'

// Configs
import { firebaseConfig } from '../assets/configs/firebaseConfig';
import { AuthComponent } from './auth/auth.component';
import { GithubComponent } from './github/github.component';

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
    GithubComponent
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
    WavesModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
