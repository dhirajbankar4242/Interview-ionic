import { Component, OnInit } from '@angular/core';
import { StudentHeaderPage } from "../student-header/student-header.page";
import { StudentFooterPage } from "../student-footer/student-footer.page";
import { StudentRoutingModule } from '../student-routing.module';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss'],
  imports: [IonContent, StudentHeaderPage, StudentFooterPage, StudentRoutingModule],
})
export class StudentLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
