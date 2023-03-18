import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Index: undefined;
  Login: undefined;
  SignUp: {
    email: string;
  };
  EmailInput: {
    authType: string;
  };
  AuthCodeInput: {
    authType: string;
    email: string;
  };
  PasswordReset: undefined;
  PasswordChange: undefined;
  Profile: undefined;
  Home: undefined;

  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: NavigatorScreenParams<TabOneStackParamList>;
  TabTwo: NavigatorScreenParams<TabTwoStackParamList>;
};

export type TabOneStackParamList = object;

export type TabTwoStackParamList = object;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type IndexScreenProps = NativeStackScreenProps<RootStackParamList, 'Index'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type EmailInputScreenProps = NativeStackScreenProps<RootStackParamList, 'EmailInput'>;
export type AuthCodeInputScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthCodeInput'>;
export type PasswordResetScreenProps = NativeStackScreenProps<RootStackParamList, 'PasswordReset'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type PasswordChangeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordChange'
>;

export type TabOneStackScreenProps<Screen extends keyof TabOneStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabOneStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type TabTwoStackScreenProps<Screen extends keyof TabTwoStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabTwoStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;
