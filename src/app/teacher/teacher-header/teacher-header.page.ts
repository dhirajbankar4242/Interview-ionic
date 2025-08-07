import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.page.html',
  styleUrls: ['./teacher-header.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon ]
})
export class TeacherHeaderPage implements OnInit {

  constructor(private router:Router) { 
    addIcons({ logOutOutline });
  }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
