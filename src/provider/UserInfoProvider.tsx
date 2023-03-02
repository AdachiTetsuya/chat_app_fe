import { createContext, useState } from 'react';

type User = {
  username: string;
  isLoggedIn: boolean;
};

type UserInfoContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserInfoContext = createContext<UserInfoContextType>({} as UserInfoContextType);

export const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });

  return <UserInfoContext.Provider value={{ user, setUser }}>{children}</UserInfoContext.Provider>;
};
