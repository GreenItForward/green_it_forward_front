import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditProfileDialogComponent } from 'src/app/components/edit-profile-dialog/edit-profile-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  currentUser: User;
  tempUser: User;
  error: string;
  creationDate: string;
  defaultImage = 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=300&d=identicon&r=PG';
  @ViewChild('imageUpload') imageUpload: ElementRef;
  loading = false;
  constructor(private userService: UserService,
    public dialog: MatDialog, public dateService: DateService) {
    
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userService.getMe();
    this.creationDate = this.dateService.formatRelativeTime(this.currentUser.firstLoginAt, "depuis");
  }

  activities = [
    {
      id: 1,
      name: 'Les pingouins',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/320/240/paris,girl/all',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Prévention des incendies',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/320/240/brazil,rio',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Atelier de cuisine verte',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/g/320/240/paris',
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'Opération nettoyage',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/320/240/dog',
      createdAt: new Date(),
    },
    {
      id: 5,
      name: 'Sauvons les abeilles',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/320/240',
      createdAt: new Date(),
    },
    {
      id: 6,
      name: 'Promenons-nous dans les bois',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: 'https://loremflickr.com/320/240',
      createdAt: new Date(),
    },
  ];

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '350px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (result.firstName === "") {
          this.error = "Le prénom ne peut pas être vide";
          return;
        } else if (result.lastName === "") {
          this.error = "Le nom ne peut pas être vide";
          return;
        }

        this.currentUser.firstName = result.firstName;
        this.currentUser.lastName = result.lastName;
        this.currentUser.imageUrl = "";
        this.updateProfil();
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.currentUser = await this.userService.getMe();
        this.loading = false;

        this.error = "";
      }
    
    });
  }

  async updateProfil() {
    try {
      const data = await this.userService.updateUser(this.currentUser);
      console.log(data);
      
    } catch (error:any) {
      this.error = error.error.message;
    }
  }
  

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.userService.updateImage(file);
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.loading = false;
      this.imageUpload.nativeElement.value = '';
      this.currentUser = await this.userService.getMe();
    }

  }

}
