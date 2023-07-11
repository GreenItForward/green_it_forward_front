import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting-profile-dialog',
  templateUrl: './setting-profile-dialog.component.html',
  styleUrls: ['./setting-profile-dialog.component.scss']
})
export class SettingProfileDialogComponent {
  isEdit: boolean = false;

  profileForm = new FormGroup({
    email: new FormControl({ value: this.data.email, disabled: true }, Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    public dialogRef: MatDialogRef<SettingProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.data,
        ...this.profileForm.value,
      };
      this.authService.changePassword(updatedUser);
      this.dialogRef.close();
    }else {
      console.log("Invalid form");
    }
  }
}
