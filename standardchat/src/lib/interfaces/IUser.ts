export interface IUser {
  __typename: string;
  id: string;
  name: string;
  profile: string;
  customField: string;
  device_type: string[];
  language: string;
}
