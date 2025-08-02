import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: "teacher-home", 
    loadComponent: () => import('./teacher-home/teacher-home.page').then(m => m.TeacherHomePage)
    // component:TeacherHomePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
