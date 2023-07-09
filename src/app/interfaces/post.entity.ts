import {User} from "./user.entity";
import {Message} from "./message.entity";
import {Community} from "./community.entity";

export interface Post {
  id: string;
  subject: string;
  text: string;
  user: User;
  community: Community;
  messages: Message[];
  creationDate: Date;
}
