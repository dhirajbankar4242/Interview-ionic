import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherFooterPage } from "../teacher-footer/teacher-footer.page";
import { TeacherHeaderPage } from "../teacher-header/teacher-header.page";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss'],
  imports: [IonContent, TeacherHeaderPage, TeacherFooterPage, RouterModule],
})
export class TeacherLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
