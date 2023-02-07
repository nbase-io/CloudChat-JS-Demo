import { IUser } from "./IUser";

export interface IMessage {
  __typename: string;
  message_id: string;
  sort_id: string;
  project_id: string;
  channel_id: string;
  message_type: string;
  mentions: string[];
  mentions_everyone: string;
  has: string;
  sender: IUser;
  admin: IUser;
  content: string;
  created_at: string;
}
