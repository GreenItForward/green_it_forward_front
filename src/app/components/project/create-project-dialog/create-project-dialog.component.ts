import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent {
  todayDate: string;
  error: string = "";
  loading: boolean = false;
  createProjectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private uploadService: UploadService, private projectService: ProjectService) {
    const date = new Date();
    this.createProjectForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null), 
      'amountRaised': new FormControl(null, Validators.required),
      'totalAmount': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
    });
  
  }


  onSubmit() {
    if (this.createProjectForm.invalid) {
      return;
    }
    
    let startDate = new Date(this.createProjectForm.value.startDate);
    let endDate = new Date(this.createProjectForm.value.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.error = "Invalid date format";
      return;
    }

    let projectData = {
      ...this.createProjectForm.value,
      startDate: startDate, // this should be a Date object, not a string
      endDate: endDate // this should be a Date object, not a string
    };


    this.projectService.createProject(projectData).then((data) => {
      this.dialogRef.close(data);
    }).catch((error) => {
      this.error = error.error.message;
    });

  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const extension = (file.name.split('.').pop() || '').toLowerCase();
      if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
        this.error = "Le fichier n'est pas un fichier image valide (jpg, jpeg, png uniquement).";
        return;
      }

      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.uploadService.uploadImage(file).then(async imageName => {
        console.log(imageName);
        this.createProjectForm.patchValue({
          imageUrl: imageName
        });
        this.error = "";
      }).catch((error) => {
        this.error = error.error.message;
      });
      this.loading = false;
    }
  }
}
