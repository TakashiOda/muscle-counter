import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Animated, Image,
  SafeAreaView, TextInput,
} from 'react-native';
/* constats */
import { WindowWidth } from '../components/WindowWidth';
const barWidth = (WindowWidth - 30) * 0.5;

export function LevelScreen() {
  const [levelUpStart, setLevelUpStart] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [inputExp, setInputExp] = useState(0);
  const [experience, setExperience] = useState(10);
  const [presentLevel, setPresentLevel] = useState(1);
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [half, setHalf] = useState(0);

  const animeWidth = new Animated.Value(0);
  const animeHalfWidth = new Animated.Value(0);
  const interpolateBar = animeWidth.interpolate({inputRange:[0,1,2],outputRange:[0, half, barWidth]});
  // const interpolateHalfBar = animeWidth.interpolate({inputRange:[0,1],outputRange:[0, 130]});
  const levelFullAnimation = Animated.timing(animeWidth,{
    toValue: 2,
    duration: 700,
    useNativeDriver: false
  });
  const levelZeroAnimation = Animated.timing(animeWidth,{
    toValue: 0,
    duration: 50,
    useNativeDriver: false
  });
  const levelHalfAnimation = Animated.timing(animeWidth,{
    toValue: 1,
    duration: 1000,
    useNativeDriver: false
  });

  const models = [];

  const times = 99;
  let levelnum = 0;
  let needExp = 10;
  let totalExp = 0;
  for(var i=0; i < times; i++){
    levelnum += 1;
    needExp = Math.floor(needExp * 1.1);
    totalExp += needExp;
    models.push({
      levelnum,
      needExp,
      totalExp,
    });
  }

  useEffect(() => {
    if (levelUpStart && count > 1) {
      levelUpAnimation();
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (levelUpStart && count == 1) {
        levelUpHalfAnimation();
    } else {
      setLevelUpStart(false);
    }
  }, [count, levelUpStart]);

  const experiencesToLevels = async(num) => {
    setIsLast(false);
    //上がった後のlevel
    const nowExp = experience + num;
    const index = models.findIndex(m => m.totalExp >= nowExp);
    // ゲージに溜まっている経験値数
    const progressExp = nowExp - (models[index - 1].totalExp);
    //ゲージの表示割合
    const ratio = (progressExp / models[index].totalExp).toFixed(2);
    const halfWidth = Math.floor(barWidth * ratio);
    setHalf(halfWidth);
    await setCount(index);
    await setLevelUpStart(true);
  };

  const levelUpAnimation = () => {
    levelFullAnimation.start(() => {
      levelZeroAnimation.start(() => {
        setLevel(level + 1);
      });
    });
  };
  const levelUpHalfAnimation = async() => {
    levelHalfAnimation.start();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder={'経験値'}
          value={inputExp}
          onChangeText={(val) => {
            // const num = parseInt(val);
            setInputExp(val);
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            // console.log(typeof(parseInt(inputExp)));
            experiencesToLevels(parseInt(inputExp));
          }}
        >
          <Text>LEVEL UP</Text>
        </TouchableOpacity>
        <View style={styles.barBox}>
          <View style={styles.levelBox}>
            <Text style={styles.levelunit}>Lv.</Text>
            <Text style={styles.levelNumText}>
              {level}
            </Text>
          </View>
          <View style={styles.barBg}>
            <Animated.View
              style={{ ...styles.bar,width: interpolateBar }}
              // style={!isLast ? {
              //   ...styles.bar,
              //   width: interpolateBar,
              // } : {
              //   ...styles.bar,
              //   width: interpolateHalfBar,
              // }}
            >
              <Text>a</Text>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

LevelScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  input: {
    width: '90%',
    height: 60,
    marginBottom: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
  },
  btn: {
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'red',
    marginBottom: 10,
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
    backgroundColor: 'green',
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
