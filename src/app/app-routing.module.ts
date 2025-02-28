import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndComponent } from './pages/end/end.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayComponent } from './pages/play/play.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: HomeComponent
  },
  {
    path: 'play',
    component: PlayComponent
  },
  {
    path: 'end',
    component: EndComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
