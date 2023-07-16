import { User } from "../models/user.model";

export interface ResponseEntity {
  id: string;
  text: string;
  user: User;
  creationDate: Date;
}
