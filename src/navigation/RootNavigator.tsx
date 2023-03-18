import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { AuthCodeInput } from 'screens/auth/AuthCodeInputScreen';
import { EmailInput } from 'screens/auth/EmailInputScreen';
import { PasswordReset } from 'screens/auth/PasswordResetScreen';
import { Home } from 'screens/HomeScreen';
import { Login } from 'screens/LoginScreen';
import { SignUp } from 'screens/SignUpScreen';

import { HeaderBackButton } from 'components/header/HeaderBackButton';

import { UserInfoContext } from 'provider/UserInfoProvider';

import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user } = useContext(UserInfoContext);

  return (
    <Stack.Navigator>
      {user?.isLoggedIn ? (
        // ログイン済みのユーザー
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              animation: 'none',
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animation: 'none',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EmailInput"
            component={EmailInput}
            options={({ route }) => ({
              title: '',
              headerLeft: () => (
                <HeaderBackButton
                  screenName={route.params.authType === 'signUp' ? '登録' : 'パスワードリセット'}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AuthCodeInput"
            component={AuthCodeInput}
            options={({ route }) => ({
              title: '',
              headerLeft: () => (
                <HeaderBackButton
                  screenName={
                    route.params.authType === 'signUp' ? 'サインアップ' : 'パスワードリセット'
                  }
                />
              ),
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerLeft: () => <HeaderBackButton screenName="" />,
            }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{
              headerLeft: () => <HeaderBackButton screenName="" />,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
