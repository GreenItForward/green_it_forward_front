import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditProfileDialogComponent } from 'src/app/components/edit-profile-dialog/edit-profile-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date.service';
import { Message } from 'src/app/interfaces/message.entity';
import { ResponseEntity } from 'src/app/interfaces/response.entity';
import { Community } from 'src/app/interfaces/community.entity';
import { Post } from 'src/app/interfaces/post.entity';
import { SettingProfileDialogComponent } from 'src/app/components/setting-profile-dialog/setting-profile-dialog.component';

export interface Activity {
  posts ?: Post[];
}


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
  activities: Post[] = [];
  nbMessages: number;
  nbResponses: number;
  nbCommunities: number;

  defaultImage = 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=300&d=identicon&r=PG';
  defaultActivityImage = 'assets/background.jpeg';
  
  @ViewChild('imageUpload') imageUpload: ElementRef;
  loading = false;
  
  constructor(private userService: UserService,
    public dialog: MatDialog, public dateService: DateService) { }
  

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userService.getMe();
    this.creationDate = this.dateService.formatRelativeTime(this.currentUser.firstLoginAt, "depuis");
    const posts = (await this.userService.getActivitiesUser()).posts;
    const messages = (await this.userService.getActivitiesUser()).messages;
    const responses = (await this.userService.getActivitiesUser()).responses;
    const communities = (await this.userService.getActivitiesUser()).communities;

    this.nbMessages = messages.length;
    this.nbResponses = responses.length;
    this.nbCommunities = communities.length;

    this.activities = posts;
  }

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

  openSettingDialog(): void {
    const dialogRef = this.dialog.open(SettingProfileDialogComponent, {
      width: '350px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (result.email === "") {
          this.error = "L'email ne peut pas être vide";
          return;
        } else if (result.password === "") {
          this.error = "Le mot de passe ne peut pas être vide";
          return;
        } else if (result.password.length < 6) {
          this.error = "Le mot de passe doit contenir au moins 6 caractères";
          return;
        }

        if (result.password !== result.confirmPassword) {
          this.error = "Les mots de passe ne sont pas identiques";
          return;
        }

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
    } catch (error:any) {
      this.error = error.error.message;
    }
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
      this.userService.updateImage(file);
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.loading = false;
      this.imageUpload.nativeElement.value = '';
      this.currentUser = await this.userService.getMe();
      this.error = "";
    }
}

}
