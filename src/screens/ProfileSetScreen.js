import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
/* constats */
import { MAIN_COLOR, MAIN_DARK_COLOR, OPACITY_ICON_COLOR, USER_NAME_LEN_MIN, USER_NAME_LEN_MAX } from '../constants/index';
/* context */
import { AuthContext } from '../contexts/AuthProvider';
import { FirestoreUserContext } from '../contexts/FirestoreUserProvider';
/* components */
import { CustomLoadingIndicator } from '../components/CustomLoadingIndicator';

export const ProfileSetScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { firestoreUser } = useContext(FirestoreUserContext);
  const [beforeName, setBeforeName] = useState(firestoreUser.name);
  const [beforeImage, setBeforeImage] = useState(firestoreUser.iconUrl);
  const [beforeGoal, setBeforeGoal] = useState(firestoreUser.goal_num);
  const [name, setName] = useState(firestoreUser.name);
  const [image, setImage] = useState(firestoreUser.iconUrl);
  const [goalNum, setGoalNum] = useState(firestoreUser.goal_num);
  const [isLoading, setIsLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      await setImage(result.uri);
    }
  };

  const checkInputIsNew = () => {
    // アイコン画像と名前の変更前後を比較して変更がなければプロフィール画面に戻る
    if (beforeName == name
      && beforeGoal == goalNum
      ) {
      navigation.navigate('AccountScreen');
      return;
    }
    // 名前チェック
    let errorMessageBody = null;
    if (!name
        || name.length > USER_NAME_LEN_MAX
        || name.length < USER_NAME_LEN_MIN) {
      errorMessageBody = `名前は${USER_NAME_LEN_MIN}〜${USER_NAME_LEN_MAX}文字の間で\n入力してください`;
    }
    // 不備があればアラートを出して関数を抜ける
    if (errorMessageBody) {
      Alert.alert(errorMessageBody);
      return;
    }

    // 登録処理
    setProfileToDb();
  };

  const setProfileToDb = async () => {
    if (name !== '') {
      setIsLoading(true);
      const db = await firebase.firestore();
      await db.collection('users').doc(`${user.uid}`).update({
        name,
        iconUrl: image,
        goal_num: goalNum,
      })
        .then(() => {
          navigation.navigate('HomeScreen');
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setIsLoading(false);
      Alert.alert('名前が入力されていません');
    }
  };


  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
    >
      <View>
        { isLoading ? (
          <CustomLoadingIndicator />
        ) : (null)}
        <View style={styles.innerContainer}>
          <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.scrollView}
          >
            <View style={styles.userProfileTop}>
              <View style={styles.userProfileTop_innerBox}>
                <View style={styles.userIconBox}>
                  <Avatar.Image
                    source={ image ? { uri: image } : (require('../assets/user_no_image.png')) }
                    size={100}
                  />
                  <TouchableOpacity
                    style={styles.iconItemBox}
                    onPress={() => pickImage()}
                  >
                    <Icon
                      style={styles.iconItem}
                      name={'camera'}
                      color={'#fff'}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileInput_Container}>
                  <TextInput
                    style={styles.name_input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={'なまえ'}
                    value={name}
                    onChangeText={(value) => setName(value)}
                  />
                  <View style={styles.num_input_box}>
                    <Text>筋トレの目標回数を入力</Text>
                    <Text style={styles.goalNum_text}>{goalNum}回</Text>
                    <Slider
                      style={{ width: '100%', height: 40 }}
                      step={5}
                      value={goalNum}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor={MAIN_DARK_COLOR}
                      maximumTrackTintColor='#eee'
                      onValueChange={(value) => setGoalNum(value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.userProfileBottom}>
            <TouchableOpacity
              style={styles.userProfileEditBtn}
              onPress={() => checkInputIsNew()}
            >
              <Text style={styles.userProfileEditBtnText}>更新</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.close_btn}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Icon
                name='times'
                size={40}
                color='gray'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

ProfileSetScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    height: '100%',
    backgroundColor: MAIN_COLOR,
    paddingHorizontal: 25,
    paddingTop: 75,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    width: '100%',
  },
  userProfileTop: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 60,
  },
  userProfileBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 30,
  },
  userProfileTop_innerBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIconBox: {
    marginBottom: 30,
  },
  iconItemBox: {
    backgroundColor: '#303030',
    width: 38,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderRadius: 50,
    position: 'absolute',
    bottom: -7,
    right: -6,
  },
  profileInput_Container: {
    width: '100%',
  },
  input_title: {
    marginBottom: 5,
    paddingLeft: 5,
    color: 'gray',
  },
  name_input: {
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingLeft: 14,
    fontSize: 17,
    marginBottom: 20,
  },
  userProfileEditBtn: {
    height: 55,
    width: '80%',
    backgroundColor: MAIN_DARK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  userProfileEditBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  close_btn: {
    width: 66,
    height: 50,
    borderRadius: 25,
    backgroundColor: OPACITY_ICON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  num_input_box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalNum_text: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
