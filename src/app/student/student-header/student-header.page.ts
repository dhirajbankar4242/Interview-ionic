import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.page.html',
  styleUrls: ['./student-header.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class StudentHeaderPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
