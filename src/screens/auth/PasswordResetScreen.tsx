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

import { postPasswordReset } from 'api/auth/postPasswordReset';

import { UserInfoContext } from 'provider/UserInfoProvider';

import { PasswordResetScreenProps as Props } from 'rootTypes';

import * as dg from 'constants/design-variables';

export const PasswordReset: React.FC<Props> = ({ navigation, route }) => {
  const [newPassword1, setNewPassword1] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');

  const [errorMsg1, setErrorMsg1] = useState<string[]>([]);
  const [errorMsg2, setErrorMsg2] = useState<string[]>([]);

  const { setUser } = useContext(UserInfoContext);

  // フィールドのバリデーション
  const checkFiledNotNull = () => {
    let result = false;
    if (newPassword1 && newPassword2) {
      result = true;
    }
    return result;
  };

  const onSubmit = async () => {
    if (checkFiledNotNull()) {
      await postPasswordReset({
        newPassword1,
        newPassword2,
      }).then((res) => {
        if (res.result) {
          setUser((prev) => ({ ...prev, ...{ isLoggedIn: true } }));
        } else {
          const errorObj = res.error!;
          switch (Object.keys(errorObj)[0]) {
            case 'new_password1':
              setErrorMsg1(Object.values(errorObj));
              break;
            case 'new_password2':
              setErrorMsg2(Object.values(errorObj));
              break;
          }
        }
      });
    } else {
      newPassword1 || setErrorMsg1(['このフィールドは必須です']);
      newPassword2 || setErrorMsg2(['このフィールドは必須です']);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.content}>
            <Text style={styles.topText}>新しいパスワードの設定</Text>
            <TextInput
              onChangeText={setNewPassword1}
              error={Boolean(errorMsg1.length)}
              onFocus={() => setErrorMsg1([])}
              mode="outlined"
              label="新しいパスワード"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry
            />
            <Text style={styles.errorMsg}>{errorMsg1}</Text>

            <TextInput
              onChangeText={setNewPassword2}
              error={Boolean(errorMsg2.length)}
              onFocus={() => setErrorMsg2([])}
              mode="outlined"
              label="新しいパスワード"
              outlineColor={dg.border}
              activeOutlineColor={dg.primary}
              style={styles.input}
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              secureTextEntry
            />
            <Text style={styles.errorMsg}>{errorMsg2}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              checkFiledNotNull() && !(errorMsg1.length || errorMsg2.length)
                ? { backgroundColor: dg.primary }
                : {},
            ]}
            onPress={onSubmit}
            activeOpacity={0.5}>
            <View style={styles.buttonTextWrap}>
              <Text style={styles.buttonText}>次へ</Text>
            </View>
          </TouchableOpacity>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 3,
    width: '90%',
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
