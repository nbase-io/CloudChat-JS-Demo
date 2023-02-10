import { IUser } from "./IUser";

export interface ISubscription {
  id: string;
  user: IUser;
  channel_id: string;
  user_id: string;
  push: boolean;
  online: boolean;
  created_at: string;
}
