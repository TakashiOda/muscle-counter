import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Animated, Image,
  SafeAreaView
} from 'react-native';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* constats */
import { MAIN_COLOR } from '../constants/index';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function Eyes({count}) {
  const [eyeIsOpen, setEyeIsOpen] = useState(true);
  const eyesOpen = require('../assets/eye_open.png');
  const eyesClosed = require('../assets/eye_close.png');

  useEffect(() => {
    const devidethree = count % 3;
    const devidefive = count % 5;
    if (devidethree == 0) {
      blinkOnce();
    }
    if (devidefive == 0) {
      blinkTwice();
    }
  },[count]);

  const blinkOnce = async() => {
    setEyeIsOpen(false);
    await wait(100).then(() => setEyeIsOpen(true));
  };

  const blinkTwice = async() => {
    setEyeIsOpen(false);
    await wait(50).then(() => setEyeIsOpen(true));
    await wait(50).then(() => setEyeIsOpen(false));
    await wait(100).then(() => setEyeIsOpen(true));
  };

  return (
    <Image
      style={styles.eyes_image}
      source={eyeIsOpen ? eyesOpen : eyesClosed}
    />
  );
}

export function PlayScreen() {
  // const [move, setMove] = useState(false);
  const [color, setColor] = useState(1);
  const [count, setCount] = useState(0);

  const colors = [
    'red', 'green', 'yellow', 'blue', 'pink', 'black'
  ];

  const position = new Animated.ValueXY({ x: 0, y: 3 });
  const legUpLeftPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legUpRightPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legBottomLeftPosition = new Animated.ValueXY({ x: 0, y: -4 });
  const legBottomRightPosition = new Animated.ValueXY({ x: 0, y: -4 });
  
  // const rotateUpLeft = legUpLeftPosition.y.interpolate({
  //   inputRange: [0, 10],
  //   outputRange: ['0deg', '45deg']
  // });
  // const rotateBottomLeft = legUpLeftPosition.y.interpolate({
  //   inputRange: [0, 10],
  //   outputRange: ['0deg', '-45deg']
  // });
  // const rotateUpRight = legUpRightPosition.y.interpolate({
  //   inputRange: [0, 10],
  //   outputRange: ['0deg', '-45deg']
  // });
  // const rotateBottomRight = legUpRightPosition.y.interpolate({
  //   inputRange: [0, 10],
  //   outputRange: ['0deg', '45deg']
  // });

  useEffect(() => {
    const devideone = count % 1;
    if (devideone == 0) {
      // moveBox();
      jump();
    }
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [count]);

  const moveBox = () => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: 12 },
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(legUpLeftPosition, {
        toValue: { x: -8, y: 4 },
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(legBottomLeftPosition, {
        toValue: { x: -8, y: -4 },
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(legUpRightPosition, {
        toValue: { x: 8, y: 4 },
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(legBottomRightPosition, {
        toValue: { x: 8, y: -4 },
        duration: 150,
        useNativeDriver: true
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 0, y: 3 },
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(legUpLeftPosition, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(legBottomLeftPosition, {
          toValue: { x: 0, y: -4 },
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(legUpRightPosition, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(legBottomRightPosition, {
          toValue: { x: 0, y: -4 },
          duration: 200,
          useNativeDriver: true
        }),
      ]).start();
    });
  };

  const jump = () => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: 12 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legUpLeftPosition, {
        toValue: { x: -8, y: 4 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legBottomLeftPosition, {
        toValue: { x: -8, y: -4 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legUpRightPosition, {
        toValue: { x: 8, y: 4 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(legBottomRightPosition, {
        toValue: { x: 8, y: -4 },
        duration: 300,
        useNativeDriver: true
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 0, y: -27 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legUpLeftPosition, {
          toValue: { x: 0, y: -30 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legBottomLeftPosition, {
          toValue: { x: 0, y: -34 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legUpRightPosition, {
          toValue: { x: 0, y: -30 },
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(legBottomRightPosition, {
          toValue: { x: 0, y: -34 },
          duration: 300,
          useNativeDriver: true
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: 0, y: 3 },
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(legUpLeftPosition, {
            toValue: { x: 0, y: 0 },
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(legBottomLeftPosition, {
            toValue: { x: 0, y: -4 },
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(legUpRightPosition, {
            toValue: { x: 0, y: 0 },
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(legBottomRightPosition, {
            toValue: { x: 0, y: -4 },
            duration: 600,
            useNativeDriver: true
          }),
        ]).start();
      });
    });
  };

  const changeColor = () => {
    const nmb = Math.floor(Math.random()*6);
    setColor(nmb);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {/* <Text>{count}</Text> */}
        <View style={styles.body}>
          <Animated.View
            style={{
              ...styles.moveBox,
              backgroundColor: colors[color],
              transform: [
                {translateX: position.x},
                {translateY: position.y}
              ]
            }}
          >
            <TouchableOpacity
              style={styles.innerBox}
              onPress={() => {
                // if (move) {
                //   setMove(false);
                // } else {
                //   setMove(true);
                // }
                changeColor();
              }}
            >
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              ...styles.eyes_image_box,
              transform: [
                {translateX: position.x},
                {translateY: position.y}
              ]
            }}
          >
            <Eyes count={count}/>
          </Animated.View>
        </View>
        <View style={styles.legs}>
          <View style={styles.legbox}>
            <Animated.View
              style={{ 
                ...styles.legUp,
                backgroundColor: colors[color],
                transform: [
                  {translateX: legUpLeftPosition.x},
                  {translateY: legUpLeftPosition.y},
                  // {rotate:rotateUpLeft}
                ]}}
            >
            </Animated.View>
            <Animated.View
              style={{ 
                ...styles.legBottom,
                backgroundColor: colors[color],
                transform: [
                  {translateX: legBottomLeftPosition.x},
                  {translateY: legBottomLeftPosition.y},
                  // {rotate: rotateBottomLeft}
                ]}}
            >
            </Animated.View>
          </View>
          <View style={styles.legbox}>
            <Animated.View
              style={{ 
                ...styles.legUp,
                backgroundColor: colors[color],
                transform: [
                  {translateX: legUpRightPosition.x},
                  {translateY: legUpRightPosition.y},
                  // {rotate:rotateUpRight}
                ]}}
            >
            </Animated.View>
            <Animated.View
              style={{ 
                ...styles.legBottom,
                backgroundColor: colors[color],
                transform: [
                  {translateX: legBottomRightPosition.x},
                  {translateY: legBottomRightPosition.y},
                  // {rotate: rotateBottomRight}
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
  body: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  eyes_image_box: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  eyes_image: {
    width: 80,
    height: 35,
  },
  moveBox: {
    width: 150,
    height: 150,
    backgroundColor: '#3e9100',
    borderRadius: 60,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legs: {
    zIndex: 1,
    width: 100,
    flexDirection: 'row',
  },
  legbox: {
    width: '50%',
    alignItems: 'center',
  },
  legUp: {
    width: 10,
    height: 20,
    // backgroundColor: 'black',
    backgroundColor: '#3e9100',
    borderRadius: 10,
    zIndex: 1,
  },
  legBottom: {
    width: 10,
    height: 20,
    // backgroundColor: 'black',
    backgroundColor: '#3e9100',
    borderRadius: 10,
    zIndex: 1,
  },
  innerBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
