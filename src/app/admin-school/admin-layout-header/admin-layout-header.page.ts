import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-layout-header',
  templateUrl: './admin-layout-header.page.html',
  styleUrls: ['./admin-layout-header.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminLayoutHeaderPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
