import { IChannel } from "./IChannel";
import { ICountUnread } from "./ICountUnread";

export interface ICreateSubscription {
  id: string;
  channel_id: string;
  user_id: string;
  language: string;
  push: boolean;
  mute: boolean;
  online: boolean;
  channel: IChannel;
  mark: ICountUnread;
  uniquekey: string;
  created_at: string;
  updated_at: string;
}
