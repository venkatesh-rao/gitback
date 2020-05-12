export interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
}

export interface IHomeProps {
  loggedInUser?: IUser;
}
