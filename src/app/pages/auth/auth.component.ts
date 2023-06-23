import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string|null = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    const user : User= {
      id: null,
      firstName: authForm.value.firstName,
      lastName: authForm.value.lastName,
      email: authForm.value.email,
      password: authForm.value.password,
      role: 'user',
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: null
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        responseData => {
          this.isLoading = false;
          // Navigate to the main page, or do something else
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      console.log("odo", this.isLoading);
      
      this.authService.register(user).subscribe(
        responseData => {
          this.isLoading = false;
          // Navigate to the main page, or do something else
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
  }
}
