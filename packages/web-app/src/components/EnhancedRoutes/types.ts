export interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
  installationId?: number;
}

export interface LoggedInUserProps {
  loggedInUser?: IUser;
}

export interface LoggedInUserData {
  me: IUser;
}
