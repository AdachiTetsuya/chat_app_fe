import { useState } from 'react';
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

import { PasswordResetScreenProps as Props } from '../../types';
import { authAxios } from '../api/axios';
import * as dg from '../constants/design-variables';
import { emailValidation } from '../utils/utils';

export const PasswordReset: React.FC<Props> = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  console.log(errorMsg);

  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result = false;
    if (email) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      if (!emailValidation(email)) {
        setErrorMsg('メールアドレスの形式が間違っています');
        return;
      }
      await authAxios
        .post('/dj-rest-auth/password/reset/', {
          email,
        })
        .then((res): void => {
          if (res.status === 200) {
            navigation.navigate('AuthCodeInput', {
              authType: 'passwordReset',
            });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text>メールアドレス入力</Text>
            <TextInput
              onChangeText={(text) => {
                setEmail(text);
                setErrorMsg('');
              }}
              error={Boolean(errorMsg)}
              mode="outlined"
              label="メールアドレス"
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
                <Text style={styles.buttonText}>メールアドレス送信</Text>
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
