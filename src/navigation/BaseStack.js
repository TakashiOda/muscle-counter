import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
/* navigators */
import { HomeStackNavigator } from './HomeStackNavigator';

const BottomTab = createStackNavigator();
export const BaseStack = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='HomeStackNavigator'
    >
      <BottomTab.Screen
        name='HomeStackNavigator'
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

const HomeIcon = ({ color, size }) => {
  return (
    <Icon
      name='home'
      color={color}
      size={size}
    />
  );
};

HomeIcon.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

