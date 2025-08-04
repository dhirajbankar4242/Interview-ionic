import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonAvatar, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, person, settingsOutline } from 'ionicons/icons';
import { HttpService } from 'src/services/http.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.page.html',
  styleUrls: ['./student-header.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButtons, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class StudentHeaderPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router, private service: HttpService, private localStorage: StorageService) {
    addIcons({ eye, settingsOutline, person, });
  }

  async ngOnInit() {
    // await this.getStudents();
  }
  async getStudents() {
    const loginId = await this.localStorage.getItem('loginId')
    const queryParams = loginId ? { loginId } : undefined;
    this.service.get("student/get-student", queryParams).subscribe((res) => {
      console.log(res);
    })
  }

  openProfileSettings() {
    let redirectUrl = 'student/student-profile-setting';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
