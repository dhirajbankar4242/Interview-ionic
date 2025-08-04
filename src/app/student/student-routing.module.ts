import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomePage } from './student-home/student-home.page';
import { StudentMenuPage } from './student-menu/student-menu.page';
import { StudentNotificationPage } from './student-notification/student-notification.page';
import { StudentProfilePage } from './student-profile/student-profile.page';
import { StudentProfileSettingsPage } from './student-profile-settings/student-profile-settings.page';
import { StudentFeesPage } from './student-fees/student-fees.page';

const routes: Routes = [
  { path: "", component:StudentHomePage},
  { path: "student-menu", component:StudentMenuPage},
  { path: "student-notification", component:StudentNotificationPage},
  { path: "student-fee", component:StudentFeesPage},
  { path: "student-profile", component:StudentProfilePage},
  { path: "student-profile-setting", component:StudentProfileSettingsPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
