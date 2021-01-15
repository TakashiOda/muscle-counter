import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomLoadingIndicator } from '../../components/CustomLoadingIndicator';
/* constants */
import { PASSWORD_LEN_MIN, PASSWORD_LEN_MAX, MAIN_COLOR } from '../../constants';
/* contexts */
import { AuthContext } from '../../contexts/AuthProvider';

export const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (name, email, password) => {
    await AsyncStorage.setItem('loggedInOnce','loggedInOnce');
    const removeBlankName = await name.replace(/\s+/g, '');
    const removeBlankEmail = await email.replace(/\s+/g, '');
    // FIXME: バリデーション群は別関数に切り出したい
    const errorList = [];
    // 名前チェック
    if (!removeBlankName) {
      errorList.push('名前が未入力です');
    } else if (removeBlankName.length > 20) {
      errorList.push('名前は最大20文字です');
    } else if (removeBlankName.length < 3) {
      errorList.push('名前は最低3文字必要です');
    }
    // メアドチェック
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!removeBlankEmail) {
      errorList.push('メールアドレスが未入力です');
    } else if (!emailRegex.test(removeBlankEmail)) {
      errorList.push('有効なメールアドレスではありません');
    }
    // パスワードチェック
    if (!password) {
      errorList.push('パスワードが未入力です');
    } else if (password.length < PASSWORD_LEN_MIN) {
      errorList.push(`パスワードは最低${PASSWORD_LEN_MIN}文字必要です`);
    } else if (password.length > PASSWORD_LEN_MAX) {
      errorList.push(`パスワードは最大${PASSWORD_LEN_MAX}文字です`);
    }
    // 半角英数字8文字以上100文字以下
    const passwordRegex = /^(?=.*?[a-z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
    if (password) {
      if (!passwordRegex.test(password)) {
        errorList.push('パスワードは半角英字・数字を組み合わせてください');
      }
    }
    // 入力不備がある場合アラートを出して関数を抜ける
    if (errorList.length > 0) {
      const errorMessageBody = errorList.join('\n');
      Alert.alert(
        '入力内容に不備があります',
        errorMessageBody,
      );
      return;
    }
    // 登録処理
    setIsLoading(true);
    await register(removeBlankName, removeBlankEmail, password);
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <>
        { isLoading ? (
          <CustomLoadingIndicator />
        ) : (null)}
        <SafeAreaView style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.topSignupBox}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.topSignupBox_Text}>ログイン</Text>
            <Icon
              style={styles.topSignupBox_Icon}
              name={'angle-right'}
              color={'#fff'}
              size={22}
            />
          </TouchableOpacity>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            behavior={'padding'}
          >
            <View style={styles.loginUpperBox}>
              <View style={styles.loginUpperBoxInner}>
                <MaterialCommunityIcons
                  style={styles.myEmail_box_icon}
                  name='weight-lifter'
                  size={80}
                  color={"#fff"}
                />
                <Text style={styles.title}>Muscle Counter</Text>
              </View>
            </View>
            <View style={styles.loginBottomBox}>
              <View style={styles.loginBottomBoxInner}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(userName) => setName(userName)}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='Nick Name'
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(userEmail) => setEmail(userEmail)}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='Email Address'
                />
                <View style={styles.passwordInputBox}>
                  <TextInput
                    style={styles.changeSetTextInput}
                    value={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={showPassword ? (false) : (true)}
                    placeholder='Password'
                  />
                  <TouchableHighlight
                    style={styles.passwordShowIconBox}
                    underlayColor='#eee'
                    onPress={() => {
                      if (showPassword) {
                        setShowPassword(false);
                      } else {
                        setShowPassword(true);
                      }
                    }}
                  >
                    <Icon
                      style={styles.passwordShowIcon}
                      name={showPassword ? 'eye' : 'eye-slash'}
                      color={'gray'}
                      size={22}
                    />
                  </TouchableHighlight>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit(name, email, password)}
                >
                  <Text style={styles.buttonTitle}>登録</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    </TouchableWithoutFeedback>
  );
};

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: MAIN_COLOR,
  },
  topSignupBox: {
    position: 'absolute',
    top: 55,
    right: 5,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  topSignupBox_Text: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 6,
    marginTop: 3,
  },
  loginUpperBox: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: MAIN_COLOR,
  },
  loginUpperBoxInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginUpperLogo: {
    marginBottom: 15,
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
  },
  sub_title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  loginBottomBox: {
    width: '100%',
    height: '50%',
    backgroundColor: MAIN_COLOR,
  },
  loginBottomBoxInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    padding: 27,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    backgroundColor: '#fff',
    height: 55,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 20,
    borderRadius: 10,
  },
  passwordInputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  changeSetTextInput: {
    backgroundColor: '#fff',
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 55,
    fontSize: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  passwordShowIconBox: {
    width: '15%',
    backgroundColor: '#fff',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: '#000',
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  signIn_forgotPasswordBox: {
    marginTop: 15,
    marginBottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
  signIn_forgotPassword_Link: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    color: '#9e9e9e',
  },
  signIn_forgotPassword_LinkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
