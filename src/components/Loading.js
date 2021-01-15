import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { WindowWidth, WindowHeight } from '../components/WindowWidth';

export const Loading = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/splash.png')}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: WindowWidth,
    height: WindowHeight,
  },
});
