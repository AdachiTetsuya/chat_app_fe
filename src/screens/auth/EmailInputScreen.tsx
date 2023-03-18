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

import { postResisterEmail } from 'api/auth/postResisterEmail';
import { postPasswordResetEmail } from 'api/auth/postPasswordResetEmail';

import { emailValidation } from 'utils/utils';
import { EmailInputScreenProps as Props } from 'rootTypes';

import * as dg from 'constants/design-variables';

export const EmailInput: React.FC<Props> = ({ navigation, route }) => {
  const { authType } = route.params;
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');

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
      const postData = {
        email,
      };
      if (authType === 'signUp') {
        const res = await postResisterEmail(postData);
        if (res.result) {
          navigation.navigate('AuthCodeInput', {
            authType: 'signUp',
            email,
          });
        } else {
          const errorObj: any = res.error;
          switch (Object.keys(errorObj!)[0]) {
            case 'email':
              setErrorMsg(errorObj!.email[0]);
              break;
          }
        }
      } else {
        const res = await postPasswordResetEmail(postData);
        if (res.result) {
          navigation.navigate('AuthCodeInput', {
            authType: 'passwordReset',
            email,
          });
        } else {
          const errorObj: any = res.error;
          switch (Object.keys(errorObj!)[0]) {
            case 'email':
              setErrorMsg(errorObj!.email[0]);
              break;
          }
        }
      }
    } else {
      email || setErrorMsg('このフィールドは必須です');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text style={styles.topText}>
              {authType === 'signUp' ? 'メールアドレスの登録' : '使用中のメールアドレス'}
            </Text>
            <Text style={styles.secondeText}>
              {authType === 'signUp'
                ? 'メールで認証コードが送られます。'
                : 'メールで再設定コードが送られます。'}
            </Text>
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
            <Text style={styles.errorMsg}>{errorMsg}</Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                emailValidation(email) ? { backgroundColor: dg.primary } : {},
              ]}
              onPress={onSubmit}
              activeOpacity={0.5}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>次へ</Text>
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
  secondeText: {
    fontSize: 16,
    color: dg.midEmphasisBlack,
    paddingBottom: 20,
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
  announceTextContainer: {
    marginTop: 10,
  },
  announceText: {},
  announceTextLinkBoard: {
    justifyContent: 'flex-end',
  },
  announceTextLink: {
    height: 15,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 50,
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
