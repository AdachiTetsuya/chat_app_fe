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
  Pressable,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { postEmailAuthCode } from 'api/auth/postEmailAuthCode';
import { postResendEmail } from 'api/auth/postResendEmail';
import { save } from 'hooks/useSecureStore';

import { AuthCodeInputScreenProps as Props } from 'rootTypes';

import * as dg from 'constants/design-variables';

const CELL_COUNT = 6;

export const AuthCodeInput: React.FC<Props> = ({ navigation, route }) => {
  const { authType, email } = route.params;

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result = false;
    if (value.length === CELL_COUNT) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      const postData = {
        auth_code: value,
        type: authType,
        email,
      };
      const res = await postEmailAuthCode(postData);
      if (res.result) {
        switch (res.data!.type) {
          case 'signUp':
            navigation.navigate('SignUp', {
              email,
            });
            break;
          case 'passwordReset':
            save('accessToken', res.data!.jwtAuthData!.accessToken);
            save('refreshToken', res.data!.jwtAuthData!.refreshToken);
            navigation.navigate('PasswordReset');
            break;
        }
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
            <Text style={styles.topText}>6ケタのコードを入力してください</Text>
            <Text style={styles.secondeText}>
              再設定コードが {email} にメールで送信されました。
            </Text>
            <CodeField
              ref={ref}
              {...props}
              caretHidden={false}
              value={value}
              onChangeText={(text) => {
                setValue(text);
                setErrorMsg('');
              }}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
            <View style={styles.resendEmailContainer}>
              <Text>メールが届きませんか?</Text>
              <Pressable
                onPress={() => {
                  postResendEmail(email);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? `${dg.stateHoverBlack}` : `${dg.background}`,
                  },
                  styles.pressable,
                ]}>
                <Text style={styles.submitText}>再送</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                checkFiledNotNull() ? { backgroundColor: dg.primary } : {},
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
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    width: '100%',
    height: 45,
    backgroundColor: 'white',
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
  errorMsg: {
    paddingLeft: 10,
    color: '#CC1436',
    fontSize: 12,
  },
  codeFieldRoot: { marginTop: 20, marginBottom: 10 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
    borderColor: dg.border,
    borderWidth: 1,
  },
  focusCell: {
    borderColor: '#000',
  },
  resendEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable: {
    marginLeft: 10,
    width: 60,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
  },
  submitText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
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
