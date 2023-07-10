import {User} from "../models/user.model";

export interface Community {
  id: string;
  name: string;
  description: string;
  followers: User[];
  user: User;
  imgUrl: string;
  creationDate:Date;
}
