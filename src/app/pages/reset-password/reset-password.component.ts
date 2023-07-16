import { User } from './../../models/user.model';
import { ConfirmationService } from './../../services/confirmation.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isLoading = false;
  error: string|null = null;
  success: string|null = null;
  token: string | null = null;

  constructor(private authService: AuthService, private route: ActivatedRoute, protected confirmationService: ConfirmationService) {
  }

  async ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.error = "Impossible de modifier votre mot de passe.";
      return;
    }


    const user: User = await this.confirmationService.confirm(this.token).toPromise() as User;
    if (!user) {
      this.error = "Impossible de modifier votre mot de passe.";
      return;
    }

    try {
      this.token = await this.authService.getLoginToken(user);
    } catch (error : any) {
      this.error = error.message;
    }

    if (!this.token) {
      this.error = "Impossible de modifier votre mot de passe.";
      return;
    }
  }

  async onSubmit(form: NgForm) {
    if (!form.valid || !this.token) {
      this.error = "Impossible de modifier votre mot de passe.";
      return;
    }
    this.isLoading = true;

    if (form.value.password !== form.value.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }
    
    const passwordData = {
      password: form.value.password,
    };

    try {
      await this.authService.changePassword(passwordData, this.token);
      this.success = "Votre mot de passe a été modifié avec succès.";
    } catch (error : any) {
      this.error = error.error.message;
    }

    this.isLoading = false;
    form.reset();
  }
}
