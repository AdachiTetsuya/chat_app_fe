import { NavigationContainer } from '@react-navigation/native';

import { RootNavigator } from './RootNavigator';
import { UserInfoProvider } from '../provider/UserInfoProvider';

export default function Navigation() {
  return (
    <NavigationContainer>
      <UserInfoProvider>
        <RootNavigator />
      </UserInfoProvider>
    </NavigationContainer>
  );
}
