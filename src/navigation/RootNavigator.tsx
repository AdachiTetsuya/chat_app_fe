import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useContext } from 'react';
import { UserInfoContext } from '../provider/UserInfoProvider';
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

                </Stack.Group>
            ) : (
                // ログイン画面
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
                </Stack.Group>
            )}
        </Stack.Navigator>
    )
}