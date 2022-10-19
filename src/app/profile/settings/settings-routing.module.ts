import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { ChangePasswordPage } from './change-password/change-password.page';

const routes: Routes = [
    { path: '', component: SettingsPage},
    { path: 'edit-profile', component: EditProfilePage },
    { path: 'change-password', component: ChangePasswordPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
