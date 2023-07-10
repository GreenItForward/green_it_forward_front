import {User} from "./user.entity";

export interface ResponseEntity {
  id: string;
  text: string;
  user: User;
  creationDate: Date;
}
