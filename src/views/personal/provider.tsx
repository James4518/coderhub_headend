import storageHelper from '@/utils/cache';
import React, {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode
} from 'react';

interface IProps {
  children?: ReactNode;
}

interface UserContextType {
  userId: number | null;
  setUserId: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<IProps> = ({ children }) => {
  let userIditem: string | number | null =
    storageHelper.getItem('USERID', 'local') ||
    storageHelper.getItem('USERID', 'session');
  if (userIditem !== null) userIditem = parseInt(userIditem, 10);
  const [userId, setUserId] = useState<number | null>(userIditem);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
