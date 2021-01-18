import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, SafeAreaView, Modal,
  TouchableOpacity, Image,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import * as firebase from 'firebase';
const db = firebase.firestore();
/* constats */
import { MAIN_COLOR, MAIN_DARK_COLOR } from '../constants/index';
import { WindowWidth } from '../components/WindowWidth';
/* contexts */
import { AuthContext } from '../contexts/AuthProvider';
import { FirestoreUserContext } from '../contexts/FirestoreUserProvider';

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { firestoreUser } = useContext(FirestoreUserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pectoral, setPectoral] = useState(firestoreUser?.pectoral_muscle);
  const [abdominal, setAbdominal] = useState(firestoreUser?.abdominal_muscle);
  const [back, setBack] = useState(firestoreUser?.back_muscle);
  const [biceps, setBiceps] = useState(firestoreUser?.biceps_brachii_muscle);
  const [leg, setLeg] = useState(firestoreUser?.leg_muscle);
  const [goal, setGoal] = useState(firestoreUser?.goal_num);
  const progressWidth = WindowWidth - 180;


  useEffect(() => {
    if (firestoreUser) {
      setPectoral(firestoreUser.pectoral_muscle);
      setAbdominal(firestoreUser.abdominal_muscle);
      setBack(firestoreUser.back_muscle);
      setBiceps(firestoreUser.biceps_brachii_muscle);
      setLeg(firestoreUser.leg_muscle);
      setGoal(firestoreUser.goal_num);
    }
  }, [firestoreUser]);

  const resetAll = () => {
    db.collection('users').doc(`${user.uid}`).update({
      pectoral_muscle: 0,
      abdominal_muscle: 0,
      back_muscle: 0,
      biceps_brachii_muscle: 0,
      leg_muscle: 0,
    });
  };

  const ratio = (num) => {
    let ratio = 0;
    if (goal > 0) {
      ratio = num / goal;
    }

    if (ratio > 1) {
      return 1;
    } else {
      return ratio;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContent}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.selectBox}>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MuscleScreen', 'pectoral');
                  }}
                >
                  <Text style={styles.selectBtnText}>腕立て</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MuscleScreen', 'abdominal');
                  }}
                >
                  <Text style={styles.selectBtnText}>腹筋</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MuscleScreen', 'back');
                  }}
                >
                  <Text style={styles.selectBtnText}>背筋</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MuscleScreen', 'biceps');
                  }}
                >
                  <Text style={styles.selectBtnText}>上腕</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MuscleScreen', 'leg');
                  }}
                >
                  <Text style={styles.selectBtnText}>スクワット</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>閉じる</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.profileBox}
          onPress={() => navigation.navigate('ProfileSetScreen')}
        >
          <Text style={styles.myname}>{firestoreUser?.name ? firestoreUser.name : 'なまえがありません'}</Text>
          <Text style={styles.goal}>{firestoreUser?.goal_num ? `それぞれ${firestoreUser.goal_num}回` : '目標なし'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reset}
          onPress={() => resetAll()}
        >
          <Text style={styles.reset_text}>リセット</Text>
        </TouchableOpacity>
        <View style={styles.muscleDataBox}>
          <View style={styles.muscleDataItem}>
            <Text style={styles.muscleDataTitle}>腕立て</Text>
            <Progress.Bar
              width={progressWidth}
              height={20}
              progress={ratio(pectoral)}
              borderRadius={10}
              color={MAIN_DARK_COLOR}
              unfilledColor={'#eee'}
              borderWidth={0}
            />
            <Text style={styles.muscleDataNum}>{pectoral}/{goal}</Text>
          </View>
          <View style={styles.muscleDataItem}>
            <Text style={styles.muscleDataTitle}>腹筋</Text>
            <Progress.Bar
              width={progressWidth}
              height={20}
              progress={ratio(abdominal)}
              borderRadius={10}
              color={MAIN_DARK_COLOR}
              unfilledColor={'#eee'}
              borderWidth={0}
            />
            <Text style={styles.muscleDataNum}>{abdominal}/{goal}</Text>
          </View>
          <View style={styles.muscleDataItem}>
            <Text style={styles.muscleDataTitle}>背筋</Text>
            <Progress.Bar
              width={progressWidth}
              height={20}
              progress={ratio(back)}
              borderRadius={10}
              color={MAIN_DARK_COLOR}
              unfilledColor={'#eee'}
              borderWidth={0}
            />
            <Text style={styles.muscleDataNum}>{back}/{goal}</Text>
          </View>
          <View style={styles.muscleDataItem}>
            <Text style={styles.muscleDataTitle}>上腕筋</Text>
            <Progress.Bar
              width={progressWidth}
              height={20}
              progress={ratio(biceps)}
              borderRadius={10}
              color={MAIN_DARK_COLOR}
              unfilledColor={'#eee'}
              borderWidth={0}
            />
            <Text style={styles.muscleDataNum}>{biceps}/{goal}</Text>
          </View>
          <View style={styles.muscleDataItem}>
            <Text style={styles.muscleDataTitle}>太もも</Text>
            <Progress.Bar
              width={progressWidth}
              height={20}
              progress={ratio(leg)}
              borderRadius={10}
              color={MAIN_DARK_COLOR}
              unfilledColor={'#eee'}
              borderWidth={0}
            />
            <Text style={styles.muscleDataNum}>{leg}/{goal}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            setModalVisible(true);
            // navigation.navigate('MuscleScreen');
          }}
          onLongPress={() => {
            navigation.navigate('PlayScreen');
          }}
        >
          <Text style={styles.startBtnText}>START</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    paddingHorizontal: 20,
  },
  innerContent: {
    width: '100%',
    height: '100%',
  },
  profileBox: {
    height: 70,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  reset: {
    width: '50%',
    height: 40,
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 15,
  },
  myname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  goal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  muscleDataBox: {
    width: '100%',
    paddingVertical: 30,
  },
  muscleDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  muscleDataTitle: {
    width: 70,
    fontSize: 18,
    fontWeight: 'bold',
    color: MAIN_DARK_COLOR
  },
  muscleDataNum: {
    width: 70,
    fontSize: 18,
    fontWeight: 'bold',
    color: MAIN_DARK_COLOR,
    textAlign: 'right',
  },
  startBtn: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 200,
    backgroundColor: MAIN_DARK_COLOR,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: '50%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  openButton: {
    width: 100,
    backgroundColor: MAIN_DARK_COLOR,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  selectBox: {
    width: '100%',
    alignItems: 'center',
  },
  selectBtn: {
    width: '80%',
    backgroundColor: 'pink',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  selectBtnText: {
    color: MAIN_DARK_COLOR,
    fontWeight: "bold",
    fontSize: 18,
  },
});