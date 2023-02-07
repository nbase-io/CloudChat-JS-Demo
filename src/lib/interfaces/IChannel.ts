import { IUser } from "./IUser";
import { IMessage } from "./IMessage";

export interface IChannel {
  __typename: string;
  id: string;
  project_id: string;
  name: string;
  user_id: IUser;
  unique_id: string;
  type: string;
  translation: boolean;
  members: string[];
  push: boolean;
  link_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  last_message: IMessage;
}
