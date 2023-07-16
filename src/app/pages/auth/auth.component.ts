import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { LoginData, RegisterData } from 'src/app/interfaces/auth.interface';
import { UploadService } from 'src/app/services/upload.service';

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
  isForgotPassword = false;

  constructor(private authService: AuthService, private commonService: CommonService, private userService: UserService,
    private uploadService: UploadService) {}

  onSwitchMode() {
    this.error = null;
    this.success = null;
    this.isForgotPassword = false;
    this.isLoginMode = !this.isLoginMode;
  }

  onForgotPassword() {
    this.error = null;
    this.success = null;
    this.isForgotPassword = !this.isForgotPassword;
  }
  
  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  async onSubmit(authForm: NgForm) {
    if (this.isForgotPassword) {
      this.onForgotPasswordSubmit(authForm);
      return;
    }

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
      let registerData: RegisterData = {
        email: authForm.value.email,
        password: authForm.value.password,
        firstName: authForm.value.firstName,
        lastName: authForm.value.lastName,
        imageUrl: null
      };
  
      if (this.selectedFile) {
        try {
          const imageName = await this.uploadService.uploadImage(this.selectedFile);
          registerData.imageUrl = imageName;
        } catch (error : any) {
          this.error = error.error.message;
          this.isLoading = false;
          return; 
        }
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

  async onForgotPasswordSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      console.log('Invalid form');
      return;
    }
  
    this.isLoading = true;
    const email = authForm.value.email;

    try {
      this.authService.forgotPassword(email)
    } catch (error : any) {
      this.error = error.error.message;
      this.isLoading = false;
      return;
    }

    this.isLoading = false;
    this.success = "Un email a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.";



    authForm.reset();

 
  }

  switchForgotPasswordMode() {
    this.isForgotPassword = !this.isForgotPassword;
    this.isLoginMode = !this.isForgotPassword; 
  }
  
}

