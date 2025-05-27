import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/providers/store';
import { RootState } from '@/app/providers/store';

const GameProcess: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default GameProcess; 