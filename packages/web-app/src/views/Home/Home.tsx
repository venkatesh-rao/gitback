import React from "react";

export interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
}

interface IHomeProps {
  loggedInUser?: IUser;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { loggedInUser } = props;
  return <div>code: {JSON.stringify(loggedInUser, null, 2)}</div>;
};

export default Home;
