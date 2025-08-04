import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-layout-footer',
  templateUrl: './admin-layout-footer.page.html',
  styleUrls: ['./admin-layout-footer.page.scss'],
  standalone: true,
  imports: [IonFooter, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminLayoutFooterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
