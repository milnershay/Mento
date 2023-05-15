
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './config/firebase';
import RootNavigation from './navigation/index.js';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </NativeBaseProvider>
  );
}