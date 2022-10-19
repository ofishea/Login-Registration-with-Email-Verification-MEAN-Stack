import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers';
import { Role } from '../_models';
import { UsersPage } from './users/users.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule), canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
