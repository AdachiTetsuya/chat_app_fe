import { useEffect, useState, useContext } from 'react';
import {
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

import { authAxios } from 'api/axios';
import { save } from 'hooks/useSecureStore';

import { UserInfoContext } from 'provider/UserInfoProvider';

// import { postPushToken } from 'api/postPushToken';
import { SignUpScreenProps } from 'rootTypes';

import * as dg from 'constants/design-variables';

export const SignUp: React.FC<SignUpScreenProps> = ({ navigation, route }) => {
  const { email } = route.params;
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const [errorMsgPassword1, setErrorMsgPassword1] = useState<string[]>([]);
  const [errorMsgPassword2, setErrorMsgPassword2] = useState<string[]>([]);

  const { setUser } = useContext(UserInfoContext);

  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result: boolean = false;
    if (password1 && password2) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      await authAxios
        .post('/dj-rest-auth/registration/', {
          email,
          password1,
          password2,
        })
        .then((res): void => {
          if (res.status === 201) {
            save('accessToken', res.data!.access_token);
            save('refreshToken', res.data!.refresh_token);
            setUser((prev) => ({ ...prev, ...{ isLoggedIn: true } }));
          }
        })
        .catch((err) => {
          const errorObj = err.response.data;
          console.log(errorObj);
          for (const element of Object.keys(errorObj)) {
            switch (element) {
              case 'password1':
                setErrorMsgPassword1(errorObj[element]);
                break;
              case 'password2':
                setErrorMsgPassword2(errorObj[element]);
                break;
              default:
                setErrorMsgPassword1(['エラーがあります']);
            }
          }
        });
    } else {
      password1 || setErrorMsgPassword1(['このフィールドは必須です']);
      password2 || setErrorMsgPassword2(['このフィールドは必須です']);
    }
  };

  useEffect(() => {
    // Unmount 時の処理
    return () => {
      // postPushToken();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text style={styles.topText}>パスワードの設定</Text>
            <View style={styles.passwordCautionBoard}>
              <Text style={styles.passwordCautionText}>
                パスワードの条件{'\n'}
                ・あなたの他の個人情報と似ているパスワードにはできません。{'\n'}
                ・パスワードは最低 8 文字以上必要です。{'\n'}
                ・よく使われるパスワードにはできません。{'\n'}
                ・数字だけのパスワードにはできません。
              </Text>
            </View>
            <TextInput
              onChangeText={setPassword1}
              error={Boolean(errorMsgPassword1.length)}
              onFocus={() => setErrorMsgPassword1([])}
              contextMenuHidden
              mode="outlined"
              label="パスワード"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry
            />
            <Text style={styles.errorMsg}>{errorMsgPassword1}</Text>
            <TextInput
              onChangeText={setPassword2}
              error={Boolean(errorMsgPassword2.length)}
              onFocus={() => setErrorMsgPassword2([])}
              contextMenuHidden
              mode="outlined"
              label="パスワード (確認)"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry
            />
            <Text style={styles.errorMsg}>{errorMsgPassword2}</Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                checkFiledNotNull() && !(errorMsgPassword1.length || errorMsgPassword2.length)
                  ? { backgroundColor: dg.primary }
                  : {},
              ]}
              onPress={onSubmit}
              activeOpacity={0.5}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>登録を完了</Text>
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
    alignItems: 'center',
  },
  content: {
    width: '90%',
  },
  topText: {
    fontWeight: '500',
    fontSize: 19,
    paddingTop: 30,
    paddingBottom: 20,
  },
  passwordCautionBoard: {},
  passwordCautionText: {
    marginBottom: 10,
    fontSize: 12,
    color: dg.midEmphasisBlack,
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
