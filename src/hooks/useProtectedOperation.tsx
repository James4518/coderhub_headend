import { useCallback } from 'react';
import { useAuth } from '@/context';

const useProtectedOperation = (operation: () => void) => {
  const { requireLogin } = useAuth();
  const handleOperation = useCallback(() => {
    requireLogin(() => {
      operation();
    });
  }, [operation, requireLogin]);
  return handleOperation;
};

export default useProtectedOperation;
