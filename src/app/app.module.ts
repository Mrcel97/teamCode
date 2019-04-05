// Components
import { AppComponent } from './app.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InterfaceComponent } from './interface/interface.component';
import { ProjectsComponent } from './interface/projects/projects.component';
import { ProjectPagesComponent } from './interface/project-pages/project-pages.component';
import { FeedComponent } from './interface/feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    InterfaceComponent,
    ProjectsComponent,
    ProjectPagesComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
