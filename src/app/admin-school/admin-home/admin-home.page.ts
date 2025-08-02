import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { IonicModule } from "@ionic/angular";
import { HttpService } from 'src/services/http.service';
import { ToastService } from 'src/services/toast.service';
import { Router } from '@angular/router';
import { IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent, IonSpinner]
})
export class AdminHomePage implements OnInit {
loading = false;
  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, private toaster: ToastService) { }

  ngOnInit() {
  }

  schoolAnnouncementForm = this.formBuilder.group({
    schoolAnnouncement: ['', [Validators.required]],
  });

  addTeacherForm = this.formBuilder.group({
    teacherName: ['', [Validators.required]],
    teacherEmail: ['', [Validators.required]],
    teacherQualification: ['', [Validators.required]],
    teacherMobileNumber: ['', [Validators.required]],
    teacherAddress: ['', [Validators.required]],
  });

  addStudentForm = this.formBuilder.group({
    studentName: ['', [Validators.required]],
    studentEmail: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
    studentMobileNumber: ['', [Validators.required]],
    studentAddress: ['', [Validators.required]],
  });

  submitSchoolAnnouncementForm() {
    const formValue = this.schoolAnnouncementForm.value;
    if (this.schoolAnnouncementForm.invalid) {
      return;
    }
    this.http.post('school/add-schoolAnnouncement', formValue).subscribe({
      next: (response) => {
        this.toaster.success('Announcement added successfully');
        this.schoolAnnouncementForm.reset(); 
      },
      error: (error) => {
        this.toaster.error('Failed to add Announcement');
        console.error(error);
      }
    });
  }

  submitTeacherForm() {
    const formValue = this.addTeacherForm.value;
    if (this.addTeacherForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('school/add-teacher', formValue).subscribe({
      next: (response) => {
        this.loading = false;
        this.toaster.success('Teacher added successfully');
        this.addTeacherForm.reset(); 
      },
      error: (error) => {
        this.loading = false;
        this.toaster.error('Failed to add teacher');
        console.error(error);
      }
    });
  }

  submitStudentForm() {
    const formValue = this.addStudentForm.value;
    if (this.addStudentForm.invalid) {
      return;
    }
    this.http.post('school/add-student', formValue).subscribe({
      next: (response) => {
        this.toaster.success('Student added successfully');
        this.addStudentForm.reset(); 
      },
      error: (error) => {
        this.toaster.error('Failed to add student');
        console.error(error);
      }
    });
  }

}
