import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-notification',
  templateUrl: './student-notification.page.html',
  styleUrls: ['./student-notification.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule]
})
export class StudentNotificationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
