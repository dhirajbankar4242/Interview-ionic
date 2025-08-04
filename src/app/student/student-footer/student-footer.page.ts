import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonFooter, IonIcon, IonToolbar, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cashOutline, gridOutline, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-student-footer',
  templateUrl: './student-footer.page.html',
  styleUrls: ['./student-footer.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonFooter, IonToolbar, CommonModule, FormsModule]
})
export class StudentFooterPage implements OnInit {


  constructor(private navCtrl: NavController) {
    addIcons({ homeOutline, cashOutline, gridOutline, notificationsOutline, personOutline });
  }
  // this.navCtrl.navigateRoot(redirectUrl).then(() => {
  //       this.toaster.success("Login successfully");
  //     });

  ngOnInit() {
  }

  goToProfile() {
    let redirectUrl = 'student/student-profile';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {      
    });
  }

  goToNotification() {
    let redirectUrl = 'student/student-notification';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {      
    });
  }

  goToMenus() {
    let redirectUrl = 'student/student-menu';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {      
    });
  }

  goToFees() {
    let redirectUrl = 'student/student-fee';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {      
    });
  }

  goToHome() {
    let redirectUrl = 'student';
    this.navCtrl.navigateRoot(redirectUrl).then(() => {      
    });
  }
}
