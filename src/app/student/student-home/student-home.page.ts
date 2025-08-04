import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HttpService } from 'src/services/http.service';
import { StorageService } from 'src/services/storage.service';

// import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent]
})
export class StudentHomePage implements OnInit {
  announcments: any[] = [];
  teacherAnnouncments: any[] = [];

  constructor(private router: Router, private service: HttpService,private localStorage: StorageService) { }
  async ngOnInit() {
    await this.getAnnouncement()
    await this.getTeacherAnnouncement()
  }
  async getTeacherAnnouncement() {
    const studentClass = await  this.localStorage.getItem('studentClass')
    console.log(studentClass)
    const queryParams = studentClass ? { studentClass } : undefined;
    this.service.get("student/teacher-announcement", queryParams).subscribe(response => {
      console.log(response);
      this.teacherAnnouncments = response.map((item: string) => JSON.parse(item));
    });
  }
  
  async getAnnouncement() {
    this.service.get("student/announcement").subscribe(response => {
      console.log(response);
      this.announcments = response.map((item: string) => JSON.parse(item));
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
