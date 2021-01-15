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
  Image,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
/* constants */
import { PASSWORD_LEN_MIN, PASSWORD_LEN_MAX, MAIN_COLOR } from '../../constants';
/* contexts */
import { AuthContext } from '../../contexts/AuthProvider';
import { CustomLoadingIndicator } from '../../components/CustomLoadingIndicator';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    const removeBlankEmail = email.replace(/\s+/g, '');
    const removeBlankPassword = password.replace(/\s+/g, '');
    await AsyncStorage.setItem('loggedInOnce','loggedInOnce');
    if (removeBlankEmail !== '' && removeBlankPassword !== '') {
      await login(email, password)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          Alert.alert(e);
        });
    } else {
      setIsLoading(false);
      Alert.alert('メールアドレス\nまたはパスワードが\n入力されていません');
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.container}
    >
      <>
        { isLoading ? (
          <CustomLoadingIndicator />
        ) : (null)}
        <SafeAreaView style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.topSignupBox}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Icon
              style={styles.topSignupBox_Icon}
              name={'angle-left'}
              color={'#fff'}
              size={22}
            />
            <Text style={styles.topSignupBox_Text}>メンバー登録</Text>
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
                <Text style={styles.sub_title}>筋トレアプリ</Text>
                <Text style={styles.title}>Muscle Counter</Text>
              </View>
            </View>
            <View style={styles.loginBottomBox}>
              <View style={styles.loginBottomBoxInner}>
                <TextInput
                  style={styles.input}
                  value={email}
                  autoFocus={false}
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
                  onPress={() => handleSubmit(email, password)}
                >
                  <Text style={styles.buttonTitle}>ログイン</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    </TouchableWithoutFeedback>
  );
};

LoginScreen.propTypes = {
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
    left: 5,
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
    marginLeft: 6,
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
    alignItems: 'center',
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
    fontSize: 20,
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
    height: 40,
    color: '#9e9e9e',
  },
  signIn_forgotPassword_LinkText: {
    color: '#00AEFF',
    fontWeight: 'bold',
  },
});
