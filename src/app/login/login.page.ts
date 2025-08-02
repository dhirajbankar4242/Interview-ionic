import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { IonicModule, NavController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/services/storage.service';
import { HttpService } from 'src/services/http.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/services/toast.service';
import { Global } from 'src/dto/dtos';
import { ValidatorComponent } from 'src/genric/validator/validator.component';
import { IonSelectCustomEvent } from '@ionic/core';
import { eye, key, person } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ValidatorComponent]
})
export class LoginPage {
  showPassword = false;
  loading = false;

  selectedSample: any;
  onSampleChange($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    throw new Error('Method not implemented.');
  }

  helper = new JwtHelperService();

  submitted = false;
  errorMsg!: string;


  schoolList = [
    { schoolName: 'one' },
    { schoolName: 'two' },
    { schoolName: 'three' }
  ];

  constructor(private storage: StorageService, private navCtrl: NavController, private localStorage: StorageService, private formBuilder: FormBuilder, private http: HttpService, private router: Router, private toaster: ToastService) {
    addIcons({ eye, key, person, });
  }

  ngOnInit() {

  }

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const value = {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value
    };
    this.http.login(value).subscribe(
      result => {
        this.loading = false;  // <-- Stop spinner on success
        this.checkLogin(result);
      },
      error => {
        this.loading = false;  // <-- Stop spinner on error
        this.toaster.error("Invalid username or password");
      }
    );
  }

  checkLogin(result: any) {
    this.localStorage.setItem(Global.studentClass, result.loginData.studentClass)
    this.localStorage.setItem(Global.key_token, result.token);
    this.localStorage.setItem(Global.key_refresh_token, result.refreshToken);
    this.localStorage.setItem(Global.key_firstName, result.loginData.firstName.en);
    this.localStorage.setItem(Global.key_loginId, result.loginData.loginId);
    this.localStorage.setItem(Global.key_role, result.loginData.role.en);
    this.localStorage.setItem(Global.key_tenant_type, result.loginData.tenantType);
    this.localStorage.setItem(Global.location, result.loginData.location);
    this.localStorage.setItem(Global.signalDevId, result.loginData.signalDevId);
    setTimeout(() => {
      let redirectUrl = '';
      if (result.loginData.tenantType === 'SUPER_ADMIN') {
        redirectUrl = 'admin/admin-home';
        console.log("admin-home");
      } else if (result.loginData.tenantType === 'TEACHER') {
        redirectUrl = 'teacher/teacher-home';
      } else if (result.loginData.tenantType === 'STUDENT') {
        // redirectUrl = 'user_home';
        redirectUrl = 'student/student-home';
      } else {
        redirectUrl = 'login'; // Default case
      }
      this.navCtrl.navigateRoot(redirectUrl).then(() => {
        this.toaster.success("Login successfully");
      });
    }, 0);
  }

}
