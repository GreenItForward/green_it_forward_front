import {Community} from "./community.entity";

export interface NewPost {
  subject: string;
  text: string;
  community: Community|null;
}
