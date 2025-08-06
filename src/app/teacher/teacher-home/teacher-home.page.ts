import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem } from '@capacitor/filesystem';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { HttpService } from 'src/services/http.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.page.html',
  styleUrls: ['./teacher-home.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonInput, IonButton, IonLabel, IonItem, IonList, IonSegmentButton, IonSegment]
})
export class TeacherHomePage implements OnInit {
  announcments: any[] = [];
  segmentValue = 'first'; // default value
  selectedFile: File | null = null
  pdfAsBase64: any
  pdfFile: File | undefined
  imageAsBase64: any

  constructor(private toaster: ToastService, private formBuilder: FormBuilder, private router: Router, private service: HttpService) { }

  ngOnInit() {
    // this.getAnnouncement();
  }

  teacherAnnouncementForm = this.formBuilder.group({
    teacherAnnouncement: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
  });

  homeworkForm = this.formBuilder.group({
    subjectName: ['', [Validators.required]],
    taskName: ['', [Validators.required]],
    studentClass: ['', [Validators.required]],
    // taskPdf: [null, Validators.required],
    // taskImage: [null, Validators.required],
  });

  async pickPdf() {
    try {
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'],
        readData: true, // optionally use this if you want auto base64
      });
      const file = result.files[0];
      console.log(file);
      if (file.blob) {
        this.pdfAsBase64 = await this.convertBlobToBase64(file.blob);
        console.log('Base64 PDF:', this.pdfAsBase64);
      } else {
        console.error('File blob is missing.');
      }
    } catch (error) {
      console.error('File pick failed', error);
    }
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // returns a base64 data URL (e.g. "data:application/pdf;base64,...")
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 90
    });
    this.imageAsBase64 = image.base64String;
    console.log('Base64 IMAGE:', this.imageAsBase64);
  }

  addHomeworkForm() {
    const formValue = this.homeworkForm.value;
    if (this.homeworkForm.invalid) {
      return;
    }
    const payload = {
      subjectName: formValue.subjectName,
      taskName: formValue.taskName,
      studentClass: formValue.studentClass,
      // pdfBase64: this.pdfAsBase64,
      imageBase64: this.imageAsBase64
    };
    console.log(payload)
    this.service.post('teacher/add-homework', payload).subscribe({
      next: (response) => {
        this.toaster.success('Homewrok added successfully');
        this.teacherAnnouncementForm.reset(); // Optional: reset the form after success
      },
      error: (error) => {
        this.toaster.error('Failed to add homework');
        console.error(error);
      }
    });
  }

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