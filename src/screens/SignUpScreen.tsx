import { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';

import { SignUpScreenProps } from '../../types';
import { authAxios } from '../api/axios';
import { postPushToken } from '../api/postPushToken';
import * as dg from '../constants/design-variables';

const WindowWidth = Dimensions.get('window').width;

export const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const [errorMsgUsername, setErrorMsgUsername] = useState<string[]>([]);
  const [errorMsgEmail, setErrorMsgEmail] = useState<string[]>([]);
  const [errorMsgPassword, setErrorMsgPassword] = useState<string[]>([]);

  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result: boolean = false;
    if (username && email && password1 && password2) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      await authAxios
        .post('/dj-rest-auth/registration/', {
          username,
          email,
          password1,
          password2,
        })
        .then((res): void => {
          console.log(res);
          if (res.status === 201) {
            console.log(res.data);
            // 認証コード入力画面に遷移
            navigation.navigate('AuthCodeInput');
          }
        })
        .catch((err) => {
          const errorObj = err.response.data;
          for (const element of Object.keys(errorObj)) {
            switch (element) {
              case 'username':
                setErrorMsgUsername(errorObj[element]);
                break;
              case 'email':
                setErrorMsgEmail(errorObj[element]);
                break;
              case 'password':
                setErrorMsgPassword(errorObj[element]);
                break;
              default:
                setErrorMsgPassword(['エラーがあります']);
            }
          }
        });
    } else {
      username || setErrorMsgUsername(['このフィールドは必須です']);
      email || setErrorMsgEmail(['このフィールドは必須です']);
      password1 || setErrorMsgPassword(['このフィールドは必須です']);
      password2 || setErrorMsgPassword(['このフィールドは必須です']);
    }
  };

  useEffect(() => {
    // Unmount 時の処理
    return () => {
      postPushToken();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text>会員登録</Text>
            <TextInput
              onChangeText={setUsername}
              error={Boolean(errorMsgUsername.length)}
              onFocus={() => setErrorMsgUsername([])}
              contextMenuHidden={true}
              mode="outlined"
              label="お名前"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
            />
            {<Text style={styles.errorMsg}>{errorMsgUsername}</Text>}
            <TextInput
              onChangeText={setEmail}
              error={Boolean(errorMsgEmail.length)}
              onFocus={() => setErrorMsgEmail([])}
              contextMenuHidden={true}
              mode="outlined"
              label="メールアドレス"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
            />
            {<Text style={styles.errorMsg}>{errorMsgEmail}</Text>}
            <TextInput
              onChangeText={setPassword1}
              error={Boolean(errorMsgPassword.length)}
              onFocus={() => setErrorMsgPassword([])}
              contextMenuHidden={true}
              mode="outlined"
              label="パスワード"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry={true}
            />
            <TextInput
              onChangeText={setPassword2}
              error={Boolean(errorMsgPassword.length)}
              onFocus={() => setErrorMsgPassword([])}
              contextMenuHidden={true}
              mode="outlined"
              label="パスワードを再入力"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry={true}
            />
            {<Text style={styles.errorMsg}>{errorMsgPassword}</Text>}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                checkFiledNotNull() &&
                !(errorMsgUsername.length || errorMsgEmail.length || errorMsgPassword.length)
                  ? { backgroundColor: dg.primary }
                  : {},
              ]}
              onPress={onSubmit}
              activeOpacity={0.5}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>ユーザー登録</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: dg.background,
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
  },
  logoWrap: {
    width: WindowWidth * 0.9,
    height: WindowWidth * 0.9 * 0.3,
    marginBottom: 30,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    width: '100%',
    height: 45,
    backgroundColor: 'white',
  },
  errorMsg: {
    paddingLeft: 15,
    color: '#CC1436',
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 3,
    width: '100%',
    height: 50,
    backgroundColor: dg.disabledBlack,
    justifyContent: 'center',
  },
  buttonTextWrap: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: dg.highEmphasisWhite,
  },
  message: {
    color: 'red',
  },
  bottomText: {
    color: dg.midEmphasisBlack,
  },
  signInButton: {
    paddingTop: 10,
  },
});
