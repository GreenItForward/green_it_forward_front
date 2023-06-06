import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPwdComponent {

  resetPwdForm: FormGroup;

  constructor() {
    this.resetPwdForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.resetPwdForm.valid) {
      // TODO: Insert service call here to handle password reset
    }
  }

}
