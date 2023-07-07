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
  createdAt: Date;
  updatedAt: Date|null;
}
