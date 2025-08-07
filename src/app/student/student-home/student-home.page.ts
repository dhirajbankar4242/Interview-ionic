import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonDatetime,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HttpService } from 'src/services/http.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
  standalone: true,
  imports: [IonImg, IonSegmentContent, IonSegmentView, CommonModule, FormsModule, IonHeader, IonThumbnail, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonSegment, IonSegmentButton, IonDatetime]
})
export class StudentHomePage implements OnInit {
  announcments: any[] = [];
  teacherAnnouncments: any[] = [];
  mainSegment = 'first';
  subSegment = 'online';
  showCalendar = false;
  calendarToggle = 'toggle'; // just a dummy model to bind segment
  homeworks: any[] = [];

  constructor(private router: Router, private service: HttpService, private localStorage: StorageService) { }
  async ngOnInit() {
    await this.getAnnouncement()
    await this.getTeacherAnnouncement()
  }
  async getTeacherAnnouncement() {
    const studentClass = await this.localStorage.getItem('studentClass')
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

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDateSelected(event: any) {
    const selectedDateString = event.detail.value;
    const dateObj = new Date(selectedDateString);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date selected:', selectedDateString);
      return;
    }
    const formattedDate = dateObj.toISOString().split('T')[0]; 
    console.log('Selected date String:', selectedDateString);
    console.log('Formatted Date:', formattedDate);
    this.showCalendar = false;
    this.getHomework(formattedDate);
  }

  async getHomework(formattedDate: any) {
    const studentClass = await this.localStorage.getItem('studentClass')
    const queryParams: any = {};
    if (studentClass) queryParams.studentClass = studentClass;
    if (formattedDate) queryParams.selectedDate = formattedDate;
    this.service.get("student/homework", queryParams).subscribe((response) => {
      this.homeworks = response;
    })
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
