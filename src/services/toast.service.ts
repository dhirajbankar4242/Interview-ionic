import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }


  async error(message: string, statusCode?: string) {
    if (statusCode) {
      const toast = await this.toastController.create({
        header: statusCode || 'Error!',
        color: 'danger',
        message: message,
        buttons: [
          {
            icon: 'close',
            side: 'end',
            role: 'cancel'
          },
        ],
        position: 'top',
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        color: 'danger',
        message: message,
        position: 'top',
        buttons: [
          {
            icon: 'close',
            side: 'end',
            role: 'cancel'
          },
        ],
      });
      await toast.present();
    }
  }

  async success(message: string) {
    const toast = await this.toastController.create({
      color: 'success',
      message: message,
      duration: 3000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          side: 'end',
          role: 'cancel'
        },
      ],
    });
    await toast.present();
  }
}
