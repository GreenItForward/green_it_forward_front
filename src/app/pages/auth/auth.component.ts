import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string|null = null;
  success: string|null = null;

  constructor(private authService: AuthService, private commonService: CommonService, private userService: UserService) {}

  onSwitchMode() {
    this.error = null;
    this.success = null;
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    const user : User= {
      id: 0,
      firstName: authForm.value.firstName,
      lastName: authForm.value.lastName,
      email: authForm.value.email,
      password: authForm.value.password,
      role: "MEMBRE",
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: null
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        (response:any) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          this.userService.login();
          this.commonService.navigate('/');
        },
        (errorMessage:any) => {
          console.error('Login response: ', errorMessage);
          this.isLoading = false;
          this.error = errorMessage.error.message;
        }
      );
    } else {
      this.authService.register(user).subscribe(
        (response:any) => {
          this.isLoading = false;
          this.success = "Votre compte a été créé avec succès. Veuillez vérifier votre boîte de réception pour confirmer votre compte.";
        },
        (errorMessage:any) => {
          console.error('Register response: ', errorMessage);
          this.isLoading = false;
          this.error = errorMessage.error.message;
        }

      );
    }



    authForm.reset();
  }
}
