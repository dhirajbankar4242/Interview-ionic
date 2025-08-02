import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { ToastService } from 'src/services/toast.service';
import { IonButton, IonLabel, IonItem, IonList, IonContent, IonToolbar, IonTitle, IonHeader, IonSegmentButton, IonSegment } from '@ionic/angular/standalone';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.page.html',
  styleUrls: ['./teacher-home.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonButton, IonLabel, IonItem, IonList, IonContent, IonToolbar, IonTitle, IonHeader, IonSegmentButton, IonSegment]
})
export class TeacherHomePage implements OnInit {
  announcments: any[] = [];
  segmentValue = 'first'; // default value

  constructor(private toaster: ToastService, private formBuilder: FormBuilder, private router: Router, private service: HttpService) { }

  ngOnInit() {
    this.getAnnouncement();
  }

  teacherAnnouncementForm = this.formBuilder.group({
    teacherAnnouncement: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
  });

  submitTeacherAnnouncementForm() {
    const formValue = this.teacherAnnouncementForm.value;
    if (this.teacherAnnouncementForm.invalid) {
      return;
    }
    this.service.post('teacher/add-teacherAnnouncement', formValue).subscribe({
      next: (response) => {
        this.toaster.success('Announcement added successfully');
        this.teacherAnnouncementForm.reset(); // Optional: reset the form after success
      },
      error: (error) => {
        this.toaster.error('Failed to add Announcement');
        console.error(error);
      }
    });
  }

  getAnnouncement() {
    this.service.get("teacher/announcement").subscribe(response => {
      this.announcments = response.map((item: string) => JSON.parse(item));
    });
  }
  
  

}
