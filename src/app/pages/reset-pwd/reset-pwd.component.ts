import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPwdService } from 'src/app/services/reset-pwd.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPwdComponent {

  resetPwdForm: FormGroup;
  message: string;

  constructor(private resetPwdService: ResetPwdService) {
    this.resetPwdForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.message = '';
    
  }

  onSubmit() {
    if (this.resetPwdForm.valid) {
      this.resetPwdService.resetPwd(this.resetPwdForm.value.email).subscribe({
        next: response => {
          this.message = response.message;
          this.resetPwdForm.reset();
        },
        error: () => {
          this.message = 'An error occurred';
        }
      });
    }
  }
  
}