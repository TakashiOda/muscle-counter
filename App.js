import React from 'react';
import { Providers } from './src/navigation/index';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style='default' />
      <Providers />
    </>
  );
}
