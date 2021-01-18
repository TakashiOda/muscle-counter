import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Animated,
  SafeAreaView
} from 'react-native';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* constats */
import { MAIN_COLOR } from '../constants/index';

export function PlayScreen() {
  const [move, setMove] = useState(false)
  const [count, setCount] = useState(0)
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  const legUpLeftPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legBottomLeftPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legUpRightPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legBottomRightPosition = new Animated.ValueXY({ x: 0, y: 0 });
  
  const rotateUpLeft = legUpLeftPosition.y.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '45deg']
  });
  const rotateBottomLeft = legUpLeftPosition.y.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '-45deg']
  });
  const rotateUpRight = legUpRightPosition.y.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '-45deg']
  });
  const rotateBottomRight = legUpRightPosition.y.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '45deg']
  });

  useEffect(() => {
    if (move) {
      const devideThree = count % 1;
      if (devideThree == 0) {
        moveBox();
      }
    }
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);
  
  // useEffect(() => {
  //   moveBox();
  // }, [move]);

  const moveBox = async() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: 18 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legUpLeftPosition, {
        toValue: { x: -8, y: 10 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legBottomLeftPosition, {
        toValue: { x: -8, y: -5 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legUpRightPosition, {
        toValue: { x: 8, y: 10 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legBottomRightPosition, {
        toValue: { x: 8, y: -5 },
        duration: 300,
        useNativeDriver: true
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legUpLeftPosition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legBottomLeftPosition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legUpRightPosition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legBottomRightPosition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true
        }),
      ]).start();
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Text>{count}</Text>
        <Animated.View
          style={{ 
            ...styles.moveBox,
            transform: [
              {translateX: position.x},
              {translateY: position.y}
            ]}}
        >
          <TouchableOpacity
            style={styles.innerBox}
            onPress={() => {
              if (move) {
                setMove(false);
              } else {
                setMove(true);
              }
            }}
          >
            <Text>aaa</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.legs}>
          <View style={styles.legbox}>
            <Animated.View
              style={{ 
                ...styles.legUp,
                transform: [
                  {translateX: legUpLeftPosition.x},
                  {translateY: legUpLeftPosition.y},
                  {rotate:rotateUpLeft}
                ]}}
            >
            </Animated.View>
            <Animated.View
              style={{ 
                ...styles.legBottom,
                transform: [
                  {translateX: legBottomLeftPosition.x},
                  {translateY: legBottomLeftPosition.y},
                  {rotate: rotateBottomLeft}
                ]}}
            >
            </Animated.View>
          </View>
          <View style={styles.legbox}>
            <Animated.View
              style={{ 
                ...styles.legUp,
                transform: [
                  {translateX: legUpRightPosition.x},
                  {translateY: legUpRightPosition.y},
                  {rotate:rotateUpRight}
                ]}}
            >
            </Animated.View>
            <Animated.View
              style={{ 
                ...styles.legBottom,
                transform: [
                  {translateX: legBottomRightPosition.x},
                  {translateY: legBottomRightPosition.y},
                  {rotate: rotateBottomRight}
                ]}}
            >
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

PlayScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  moveBox: {
    width: 100,
    height: 200,
    backgroundColor: 'red',
  },
  legs: {
    width: 100,
    flexDirection: 'row',
  },
  legbox: {
    width: '50%',
    alignItems: 'center',
  },
  legUp: {
    width: 10,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  legBottom: {
    width: 10,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  innerBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
