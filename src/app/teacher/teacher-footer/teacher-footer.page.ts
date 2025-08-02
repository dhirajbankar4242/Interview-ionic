import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-teacher-footer',
  templateUrl: './teacher-footer.page.html',
  styleUrls: ['./teacher-footer.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TeacherFooterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
