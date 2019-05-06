// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomepageComponent } from './homepage/homepage.component';
import { InterfaceComponent } from './interface/interface.component';
import { IdeComponent } from './ide/ide.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'collaborators', component: HomepageComponent},
  {path: 'public-projects', component: HomepageComponent},
  {path: 'interface', component: InterfaceComponent},
  {path: 'workspace/:workspace_id', component: IdeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
