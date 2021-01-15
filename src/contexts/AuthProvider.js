import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import ENV from '../../env.json';

const getEnvironment = (releaseChannel) => {
  if (releaseChannel === undefined) {
    // release channelがなければstagingを使う
    return ENV.staging;
  } else if (releaseChannel === 'staging') {
    return ENV.staging;
  } else if (releaseChannel === 'production') {
    return ENV.production;
  }
};

// リリースチャンネルを取得
const releaseChannel = Constants.manifest.releaseChannel;
const env = getEnvironment(releaseChannel);
const firebaseConfig = env.firebase;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    autoLogin();
  },[]);

  // SecureStoreにemailとpasswordがあれば自動ログイン
  const autoLogin = async () => {
    const useEmail = await SecureStore.getItemAsync('email');
    const usePassword = await SecureStore.getItemAsync('password');
    if (useEmail && usePassword) {
      firebase.auth().signInWithEmailAndPassword(useEmail, usePassword)
        .catch(() => {
          return null;
        });
    }
  };

  const hasLoginAlert = (e) => {
    if (e.match('The password is invalid or the user does not have a password')) {
      Alert.alert(
        'メールアドレスまたはパスワードが正しくありません'
      );
    } else if (e.match('There is no user record corresponding to this identifier')) {
      Alert.alert(
        'メールアドレスの登録がありません\nアドレスを確かめて再度お試しください'
      );
    } else if (e.match('The email address is badly formatted')) {
      Alert.alert(
        'メールアドレスの形式が正しくありません。アドレスを確かめて再度お試しください'
      );
    } else if (e.match('Access to this account has been temporarily disabled due to many failed login attempts')) {
      Alert.alert(
        '３回以上ログインに失敗しました。しばらく経ってから再度お試しください');
    } else {
      Alert.alert('ログインできません');
    }
  };

  const hasSignUpAlert = (e) => {
    if (e.match('The email address is badly formatted')) {
      Alert.alert('メールアドレスが\n正しい形式ではありません');
    } else if (e.match('The email address is already in use by another account')) {
      Alert.alert('入力されたメールアドレスはすでに使われています');
    } else if (e.match('"The email address is already in use by another account')) {
      Alert.alert('入力されたメールアドレスは\nすでに使われています');
    } else {
      Alert.alert('入力された情報ではユーザー登録できませんでした。再度お試しください');
    }
  };

  const hasLogOutAlert = () => {
    Alert.alert('正常にログアウトできませんでした。再度お試しください');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
              .then(async(firebaseUser) => {
                if (firebaseUser.user) {
                  SecureStore.setItemAsync('email', email);
                  SecureStore.setItemAsync('password', password);
                }
              });
          } catch (e) {
            firebase.auth().signOut();
            hasLoginAlert(e.toString());
          }
        },
        register: async (name, email, password) => {
          try {
            const db = firebase.firestore();
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(async() => {
                const currentUser = firebase.auth().currentUser;
                await db.collection('users').doc(`${currentUser.uid}`).set({
                  name,
                  iconUrl: 0,
                  pectoral_muscle: 0,
                  abdominal_muscle: 0,
                  back_muscle: 0,
                  biceps_brachii_muscle: 0,
                  leg_muscle: 0,
                  goal_num: 100,
                });
              })
              .catch(function(e) {
                console.log(e);
                hasSignUpAlert(e.toString());
              });
          } catch (e) {
            hasSignUpAlert(e.toString());
          }
        },
        logout: async () => {
          try {
            await SecureStore.deleteItemAsync('email');
            await SecureStore.deleteItemAsync('password');
            await firebase.auth().signOut();
          } catch (e) {
            hasLogOutAlert(e.toString());
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
