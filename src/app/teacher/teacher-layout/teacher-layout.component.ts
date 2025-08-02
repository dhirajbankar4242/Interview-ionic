import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherFooterPage } from "../teacher-footer/teacher-footer.page";
import { TeacherHeaderPage } from "../teacher-header/teacher-header.page";

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss'],
  imports: [TeacherHeaderPage, TeacherFooterPage, RouterModule],
})
export class TeacherLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
