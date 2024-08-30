import storageHelper, { StorageType } from '@/utils/cache';
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
  setUserId: (id: number | null) => void;
  storageType: StorageType;
  setStorageType: (storageType: StorageType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: FC<IProps> = ({ children }) => {
  const [storageType, setStorageType] = useState<StorageType>('local');
  let userIditem: string | number | null = storageHelper.getItem(
    'USERID',
    storageType
  );
  if (userIditem !== null) userIditem = parseInt(userIditem);
  const [userId, setUserId] = useState<number | null>(userIditem);
  return (
    <UserContext.Provider
      value={{ userId, setUserId, storageType, setStorageType }}
    >
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
