import storageHelper, { StorageType } from '@/utils/cache';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect,
  useCallback
} from 'react';
import { useUser } from './user';

interface IProps {
  children?: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  showModal: boolean;
  login: () => void;
  logout: () => void;
  setShowModal: (isShow: boolean) => void;
  requireLogin: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  showModal: false,
  login: () => {},
  logout: () => {},
  setShowModal: () => {},
  requireLogin: () => {}
});

export const AuthProvider: FC<IProps> = ({ children }) => {
  const { storageType } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return storageHelper.getItem('ISAUTHENTICATED', storageType) === 'true';
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    storageHelper.setItem(
      'ISAUTHENTICATED',
      isAuthenticated ? 'true' : 'false',
      storageType
    );
    return () => storageHelper.removeItem('ISAUTHENTICATED', storageType);
  }, [isAuthenticated, storageType]);
  const login = useCallback(() => {
    setIsAuthenticated(true);
    storageHelper.setItem('ISAUTHENTICATED', 'true', storageType);
    setShowModal(false);
  }, [storageType]);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    storageHelper.removeItem('ISAUTHENTICATED', storageType);
  }, [storageType]);
  const requireLogin = useCallback(
    (callback: () => void) => {
      if (isAuthenticated) {
        callback();
      } else {
        setShowModal(true);
      }
    },
    [isAuthenticated]
  );
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        showModal,
        setShowModal,
        requireLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
