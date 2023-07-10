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
      if(!this.selectedFile) {
        const registerData: RegisterData = {
          email: authForm.value.email,
          password: authForm.value.password,
          firstName: authForm.value.firstName,
          lastName: authForm.value.lastName,
        };

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
      } else {
        const registerImageData = new FormData();
        registerImageData.append('email', authForm.value.email);
        registerImageData.append('password', authForm.value.password);
        registerImageData.append('firstName', authForm.value.firstName);
        registerImageData.append('lastName', authForm.value.lastName);
  
        if(this.selectedFile) {
          registerImageData.append('image', this.selectedFile, this.selectedFile.name);
        }
  
        this.authService.registerImage(registerImageData).subscribe(
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
      
    }

    authForm.reset();
    this.selectedFile = null;
  }
}

