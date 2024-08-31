import storageHelper from '@/utils/cache';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC
} from 'react';

interface IProps {
  children?: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  showModal: boolean;
  login: () => void;
  logout: () => void;
  requireLogin: (callback: () => void) => void;
  setShowModal: (isShow: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  showModal: false,
  login: () => {},
  logout: () => {},
  requireLogin: () => {},
  setShowModal: () => {}
});

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = storageHelper.getItem('ISAUTHENTICATED','local');
    return savedAuth == 'true';
  });
  const [showModal, setShowModal] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
    storageHelper.setItem('ISAUTHENTICATED', 'true', 'local');
    setShowModal(false);
  };
  const logout = () => { 
    setIsAuthenticated(false);
    storageHelper.removeItem('ISAUTHENTICATED', 'local');
  }
  const requireLogin = (callback: () => void) => {
    if (isAuthenticated) {
      callback();
    } else {
      setShowModal(true);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        requireLogin,
        showModal,
        setShowModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
