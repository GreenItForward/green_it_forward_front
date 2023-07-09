import {User} from "../models/user.model";

export interface NewCommunity {
  name: string;
  description: string;
  followers:User[];
  imgUrl:string;
}
