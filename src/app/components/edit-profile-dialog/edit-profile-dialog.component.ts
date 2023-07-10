import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(this.data.firstName, Validators.required),
    lastName: new FormControl(this.data.lastName, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
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
      this.userService.updateUser(updatedUser);
      this.dialogRef.close();
    }
  }
}
