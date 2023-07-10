import {Post} from "./post.entity";
import {Message} from "./message.entity";

export interface NewResponse {
  text: string;
  message: Message|null
}
