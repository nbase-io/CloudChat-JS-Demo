import { IUser } from "./IUser";

export interface IFriendship {
  project_id: string;
  id: string;
  status: string;
  user: IUser;
  friend: IUser;
  friend_id: string;
  created_at: string;
  updated_at: string;
  requested_at: string;
}
