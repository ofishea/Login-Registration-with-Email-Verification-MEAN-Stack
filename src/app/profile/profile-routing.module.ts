import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

const settingsPageModule = () => import('./settings/settings.module').then(x => x.SettingsPageModule);

const routes: Routes = [
    { path: '', component: ProfilePage},
    { path: 'settings', loadChildren: settingsPageModule }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {}
