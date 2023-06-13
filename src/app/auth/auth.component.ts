import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdokYr_EctesDEq0j0pbBGQgV3WuhDI4M',
  authDomain: 'ng-recipe-book-5825f.firebaseapp.com',
  projectId: 'ng-recipe-book-5825f',
  storageBucket: 'ng-recipe-book-5825f.appspot.com',
  messagingSenderId: '173222787143',
  appId: '1:173222787143:web:f76418a3257bc12372d962',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage.errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    console.log(form.value);
    form.reset();
  }
}
