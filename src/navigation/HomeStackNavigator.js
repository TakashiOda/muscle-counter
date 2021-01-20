import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
/* screens */
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileSetScreen } from '../screens/ProfileSetScreen';
import { MuscleScreen } from '../screens/MuscleScreen';
import { PlayScreen } from '../screens/PlayScreen';
import { LevelScreen } from '../screens/LevelScreen';

const HomeStack = createStackNavigator();
export const HomeStackNavigator = ({ navigation, route }) => {

  return (
    <HomeStack.Navigator
      initialRouteName='HomeScreen'
    >
      <HomeStack.Screen
        name='HomeScreen'
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name='ProfileSetScreen'
        options={{ headerShown: false }}
        component={ProfileSetScreen}
      />
      <HomeStack.Screen
        name='MuscleScreen'
        options={{ headerShown: false }}
        component={MuscleScreen}
      />
      <HomeStack.Screen
        name='PlayScreen'
        options={{ headerShown: false }}
        component={PlayScreen}
      />
      <HomeStack.Screen
        name='LevelScreen'
        options={{ headerShown: false }}
        component={LevelScreen}
      />
    </HomeStack.Navigator>
  );
};

HomeStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};
