import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Login: undefined,
    SignUp: undefined,
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
    TabOne: NavigatorScreenParams<TabOneStackParamList>;
    TabTwo: NavigatorScreenParams<TabTwoStackParamList>;
};

export type TabOneStackParamList = {
};

export type TabTwoStackParamList = {
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = 
CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export type LoginScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Login"
>

export type SignUpScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "SignUp"
>

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
