import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { LoginData, RegisterData } from 'src/app/interfaces/auth.interface';

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
  selectedFile: File | null = null;  

  constructor(private authService: AuthService, private commonService: CommonService, private userService: UserService) {}

  onSwitchMode() {
    this.error = null;
    this.success = null;
    this.isLoginMode = !this.isLoginMode;
  }
  
  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      console.log('Invalid form');
      return;
    }

    
    this.isLoading = true;
    if (this.isLoginMode) {
      const loginData: LoginData = {
        email: authForm.value.email,
        password: authForm.value.password,
      };

      this.authService.login(loginData).subscribe(
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
      console.log('selectedFile: ', this.selectedFile);

      const registerData = new FormData();
      registerData.append('email', authForm.value.email);
      registerData.append('password', authForm.value.password);
      registerData.append('firstName', authForm.value.firstName);
      registerData.append('lastName', authForm.value.lastName);
  
      // Only add the file to the FormData if one was selected
      if (this.selectedFile) {
        registerData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.authService.register(registerData).subscribe(
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
    this.selectedFile = null;
  }
}

