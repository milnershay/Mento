import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication.ts';
import UserStack from './userStack.js';
import AuthStack from './authStack.js';

export default function RootNavigation() {
  const { user } = useAuthentication();
  return user ? <UserStack /> : <AuthStack />;
}