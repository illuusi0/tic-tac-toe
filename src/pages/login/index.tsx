import React from 'react';
import { Container } from '@mui/material';
import LoginForm from '@/features/auth/ui/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default LoginPage; 