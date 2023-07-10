import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  currentUser: User;

  constructor(private userService: UserService) {}

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


}
