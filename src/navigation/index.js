import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthProvider';
import { Routes } from './Routes';

export const Providers = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};
