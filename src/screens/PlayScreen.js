import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Animated, Image,
  SafeAreaView
} from 'react-native';
import LottieView from 'lottie-react-native';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* constats */
import { WindowWidth } from '../components/WindowWidth';
import { MAIN_COLOR } from '../constants/index';
const barWidth = (WindowWidth - 30) * 0.5;

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
  const [crackerOn, setCrackerOn] = useState(false);
  const [presentExp, setPresentExp] = useState(10);
  const [presentLevel, setPresentLevel] = useState(1);
  const [level, setLevel] = useState(1);
  const [count, setCount] = useState(0);

  // const exps = [10,11,12,13,14,15,16,17,18,19,20];
  // const models = [];

  // const times = 30;
  // let levelnum = 0;
  // let needExp = 10;
  // let totalExp = 0;
  // for(var i=0; i < times; i++){
  //   levelnum += 1;
  //   needExp = Math.floor(needExp * 1.1);
  //   totalExp += needExp;
  //   models.push({
  //     levelnum,
  //     needExp,
  //     totalExp,
  //   });
  // }

  const animeWidth = new Animated.Value(0);
  const position = new Animated.ValueXY({ x: 0, y: 3 });
  const legUpLeftPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legUpRightPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const legBottomLeftPosition = new Animated.ValueXY({ x: 0, y: -4 });
  const legBottomRightPosition = new Animated.ValueXY({ x: 0, y: -4 });

  const interpolateBar = animeWidth.interpolate({inputRange:[0,1],outputRange:[0, 400]});
  const animatedTransition = Animated.timing(animeWidth,{
    toValue: 1,
    duration: 1000,
    useNativeDriver: false
  });

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
    const devideone = count % 1;
    if (devideone == 0) {
      // moveBox();
      // jump();
      clickAnimate();
    }
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  // useEffect(() => {
  //   experiencesToLevels(53);
  // }, []);

  // const experiencesToLevels = async(num) => {
  //   const index = models.findIndex(m => m.totalExp >= num);
  //   const progressExp = num - (models[index - 1].totalExp);
  //   const ratio = (progressExp / models[index].totalExp).toFixed(2);
  //   console.log(index); //これが上がった後のlevel
  //   console.log(progressExp); // ゲージに溜まっている経験値数
  //   console.log(ratio); //ゲージの表示割合
  // };

  const clickAnimate = () => {
    Animated.parallel([
      animatedTransition,
    ]).start(() => {
      setLevel(level + 1);
    });
  };

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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {/* <LottieView
          style={styles.lottie}
          source={require('../assets/lottie/37723-confetti-partyyy.json')}
          speed={1}
          autoPlay
          loop={false}
          progress={1}
          // ref={homeAnimation}
        /> */}
        <View style={styles.body}>
          <Animated.View
            style={{
              ...styles.moveBox,
              transform: [
                {translateX: position.x},
                {translateY: position.y}
              ]
            }}
          >
            <TouchableOpacity
              style={styles.innerBox}
              onPress={() => {
                // setCrackerOn(true);
              }}
            >
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              ...styles.eyes_image_box,
              // transform: [
              //   {translateX: position.x},
              //   {translateY: position.y}
              // ]
            }}
          >
            {/* <Eyes count={count}/> */}
          </Animated.View>
        </View>
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
        <View style={styles.barBox}>
          <View style={styles.levelBox}>
            <Text style={styles.levelunit}>Lv.</Text>
            <Animated.Text style={styles.levelNumText}>
              {level}
            </Animated.Text>
          </View>
          <View style={styles.barBg}>
            <Animated.View
              style={{
                ...styles.bar,
                width: interpolateBar,
              }}
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
    backgroundColor: '#fff',
    // backgroundColor: MAIN_COLOR,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'relative',
  },
  lottie: {
    position: 'absolute',
  },
  barBox: {
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  barBg: {
    width: barWidth,
    height: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  bar: {
    height: 20,
    borderRadius: 10,
  },
  levelBox: {
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  levelunit: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelNumText: {
    fontSize: 24,
    fontWeight: 'bold',
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
