import { useContext, useState } from 'react';
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

import { AuthCodeInputScreenProps as Props } from '../../types';
import { postEmailAuthCode } from '../api/postEmailAuthCode';
import * as dg from '../constants/design-variables';
import { save } from '../hooks/useSecureStore';
import { UserInfoContext } from '../provider/UserInfoProvider';

export const AuthCodeInput: React.FC<Props> = ({ navigation }) => {
  const [authCode, setauthCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { setUser } = useContext(UserInfoContext);

  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result = false;
    if (authCode) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      const postData = {
        auth_code: authCode,
        type: 'signup',
      };
      const res = await postEmailAuthCode(postData);
      console.log(res);
      if (res.result) {
        setUser({ username: '', isLoggedIn: true });
        save('accessToken', res.data!.accessToken);
        save('refreshToken', res.data!.refreshToken);
      } else {
        setErrorMsg('認証コードが違います');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text>認証コード入力</Text>
            <TextInput
              onChangeText={setauthCode}
              error={Boolean(errorMsg)}
              onFocus={() => setErrorMsg('')}
              mode="outlined"
              label="認証コード"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
            />
            {<Text style={styles.errorMsg}>{errorMsg}</Text>}

            <TouchableOpacity
              style={[
                styles.buttonContainer,
                checkFiledNotNull() ? { backgroundColor: dg.primary } : {},
              ]}
              onPress={onSubmit}
              activeOpacity={0.5}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>認証コード送信</Text>
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
