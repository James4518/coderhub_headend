import storageHelper, { StorageType } from '@/utils/cache';
import React, {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useCallback
} from 'react';

interface IProps {
  children?: ReactNode;
}
interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  storageType: StorageType;
  updateUser: (storage: StorageType, userId: number) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  storageType: 'local',
  setUserId: (id: number | null) => {},
  updateUser: (storage, userId) => {}
});
export const UserProvider: FC<IProps> = ({ children }) => {
  const [storageType, setStorageType] = useState<StorageType>(() => {
    return (
      (storageHelper.getItem('STORAGE_TYPE', 'session') as StorageType) ||
      'local'
    );
  });
  const userIdItem = storageHelper.getItem('USERID', storageType);
  const initialUserId = userIdItem !== null ? parseInt(userIdItem) : null;
  const [userId, setUserId] = useState<number | null>(initialUserId);
  useEffect(() => {
    storageHelper.setItem('STORAGE_TYPE', storageType, storageType);
    return () => storageHelper.removeItem('STORAGE_TYPE', storageType);
  }, [storageType]);
  useEffect(() => {
    storageHelper.setItem('USERID', userId?.toString() ?? '', storageType);
    return () => storageHelper.removeItem('USERID', storageType);
  }, [userId, storageType]);
  const updateUser = useCallback(
    (storageType: StorageType, id: number) => {
      setStorageType(storageType);
      setUserId(id);
    },
    [storageType, userId]
  );
  return (
    <UserContext.Provider
      value={{ userId, setUserId, storageType, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
