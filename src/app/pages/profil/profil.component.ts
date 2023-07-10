import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditProfileDialogComponent } from 'src/app/components/edit-profile-dialog/edit-profile-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  currentUser: User;
  defaultImage = 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=300&d=identicon&r=PG';
  @ViewChild('imageUpload') imageUpload: ElementRef;

  constructor(private userService: UserService,
    public dialog: MatDialog) {
    
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userService.getMe();
  }

  user: User = {
    id: 1,
    email: 'user@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    role: 'User',
    ipAddress: null,
    isVerified: true,
    confirmationToken: null,
    isBanned: false,
    imageUrl: 'https://i.pravatar.cc/300',
    firstLoginAt: new Date(),
    lastLoginAt: null,
  };

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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser = result;
        this.updateProfil();
      }
    });
  }

  updateProfil() {
    this.userService.updateUser(this.currentUser);
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.userService.updateImage(file);
      this.currentUser = await this.userService.getMe();
    }

  }

}
