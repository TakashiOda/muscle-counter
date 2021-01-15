import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* constats */
import { WindowWidth } from '../components/WindowWidth';
import { MAIN_COLOR, MAIN_DARK_COLOR } from '../constants/index';
/* contexts */
import { AuthContext } from '../contexts/AuthProvider';

export function MuscleScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0)
  const [muscleType, setMuscleType] = useState('pectoral');

  useEffect(() => {
    if (route?.params) {
      setMuscleType(route?.params);
    }
  }, [route]);

  const hundleFinish = async() => {
    if (muscleType == 'pectoral') {
      db.collection('users').doc(`${user.uid}`).update({
        pectoral_muscle: firebase.firestore.FieldValue.increment(count),
      });
    } else if (muscleType == 'abdominal') {
      db.collection('users').doc(`${user.uid}`).update({
        abdominal_muscle: firebase.firestore.FieldValue.increment(count),
      });
    } else if (muscleType == 'back') {
      db.collection('users').doc(`${user.uid}`).update({
        back_muscle: firebase.firestore.FieldValue.increment(count),
      });
    } else if (muscleType == 'biceps') {
      db.collection('users').doc(`${user.uid}`).update({
        biceps_brachii_muscle: firebase.firestore.FieldValue.increment(count),
      });
    } else if (muscleType == 'leg') {
      db.collection('users').doc(`${user.uid}`).update({
        leg_muscle: firebase.firestore.FieldValue.increment(count),
      });
    }
    await navigation.navigate('HomeScreen');
  };

  const type = () => {
    if (muscleType == 'pectoral') {
      return '腕立て'
    } else if (muscleType == 'abdominal') {
      return '腹筋'
    } else if (muscleType == 'back') {
      return '背筋'
    } else if (muscleType == 'biceps') {
      return '上腕を鍛える'
    } else if (muscleType == 'leg') {
      return 'スクワット'
    }
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.title}>{type()}開始</Text>
        <View style={styles.countBtnBox}>
          <TouchableOpacity
            style={styles.countBtn}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.count}>{count}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.reset_btn}
            onPress={() => setCount(0)}
          >
            <Text style={styles.finish_btn_text}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.finish_btn}
            onPress={() => hundleFinish()}
          >
            <Text style={styles.finish_btn_text}>Finish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

MuscleScreen.propTypes = {
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
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    height: '10%',
    marginTop: 20,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  countBtnBox: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBtn: {
    width: WindowWidth * 0.8,
    height: WindowWidth * 0.8,
    borderRadius: 300,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: MAIN_DARK_COLOR,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 5.0,
    elevation: 5
  },
  count: {
    marginTop: 20,
    fontSize: 200,
    color: '#fff',
    fontWeight: 'bold',
  },
  btns: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  reset_btn: {
    width: '80%',
    height: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finish_btn: {
    width: '80%',
    height: 55,
    backgroundColor: MAIN_DARK_COLOR,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finish_btn_text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
