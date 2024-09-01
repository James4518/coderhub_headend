import { useCallback } from 'react';
import { useAuth } from '@/context';

const useProtectedOperation = (...operations: ((...args: any[]) => void)[]) => {
  const { requireLogin } = useAuth();
  const handleOperation = useCallback(
    (...args: any[]) => {
      requireLogin(() => {
        operations.forEach((operation) => {
          operation(...args);
        });
      });
    },
    [requireLogin, ...operations]
  );
  return handleOperation;
};

export default useProtectedOperation;
