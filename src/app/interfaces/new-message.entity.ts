import {Post} from "./post.entity";

export interface NewMessage {
  text: string;
  post: Post|null
}
