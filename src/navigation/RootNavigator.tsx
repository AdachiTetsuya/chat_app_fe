import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { RootStackParamList } from '../../types';
import { UserInfoContext } from '../provider/UserInfoProvider';
import { AuthCodeInput } from '../screens/AuthCodeInputScreen';
import { Home } from '../screens/HomeScreen';
import { Login } from '../screens/LoginScreen';
import { SignUp } from '../screens/SignUpScreen';

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
            name="SignUp"
            component={SignUp}
            options={{
              animation: 'none',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AuthCodeInput"
            component={AuthCodeInput}
            options={{
              animation: 'none',
              headerShown: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
