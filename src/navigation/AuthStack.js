import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from '../screens/authScreens/SignUpScreen';
import { LoginScreen } from '../screens/authScreens/LoginScreen';

const Stack = createStackNavigator();
export const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
