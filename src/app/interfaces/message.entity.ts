import {User} from "./user.entity";

export interface Message {
  id: string;
  text: string;
  user: User;
  createdAt: Date;
  updatedAt: Date|null;
}
