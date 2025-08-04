import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-student-profile-settings',
  templateUrl: './student-profile-settings.page.html',
  styleUrls: ['./student-profile-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StudentProfileSettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
