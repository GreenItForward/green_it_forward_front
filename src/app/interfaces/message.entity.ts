import { User } from './../models/user.model';
export interface Message {
  id: string;
  text: string;
  user: User;
  creationDate: Date;
}
