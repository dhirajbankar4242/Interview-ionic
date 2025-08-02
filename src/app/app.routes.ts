import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-school/admin-layout/admin-layout.component';
import { authGuard } from 'src/services/auth.guard';
import { TeacherLayoutComponent } from './teacher/teacher-layout/teacher-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin-school/admin.module').then(m => m.AdminModule),
    canActivateChild: [authGuard]
  },
  {
    path: 'teacher',
    component: TeacherLayoutComponent,
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
    canActivateChild: [authGuard]
  },
  {
    path: 'student',
    component: StudentLayoutComponent,
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivateChild: [authGuard]
  },
  // {
  //   path: 'teacher-home',
  //   loadComponent: () => import('./teacher/teacher-home/teacher-home.page').then( m => m.TeacherHomePage)
  // },
  // {
  //   path: 'student-home',
  //   loadComponent: () => import('./student/student-home/student-home.page').then( m => m.StudentHomePage)
  // },
  // {
  //   path: 'admin-home',
  //   loadComponent: () => import('./admin-school/admin-home/admin-home.page').then( m => m.AdminHomePage)
  // },
  // {
  //   path: 'student-header',
  //   loadComponent: () => import('./student/student-header/student-header.page').then( m => m.StudentHeaderPage)
  // },
  // {
  //   path: 'student-footer',
  //   loadComponent: () => import('./student/student-footer/student-footer.page').then( m => m.StudentFooterPage)
  // },
  // {
  //   path: 'teacher-header',
  //   loadComponent: () => import('./teacher/teacher-header/teacher-header.page').then( m => m.TeacherHeaderPage)
  // },
  // {
  //   path: 'teacher-footer',
  //   loadComponent: () => import('./teacher/teacher-footer/teacher-footer.page').then( m => m.TeacherFooterPage)
  // },
  // {
  //   path: 'admin-header',
  //   loadComponent: () => import('./admin-school/admin-header/admin-header.page').then( m => m.AdminHeaderPage)
  // },
  // {
  //   path: 'admin-footer',
  //   loadComponent: () => import('./admin-school/admin-footer/admin-footer.page').then( m => m.AdminFooterPage)
  // },
];
