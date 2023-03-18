import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';

import * as dg from 'constants/design-variables';

type argsType = {
  navigation: any;
  screenName: string;
};
const WindowWidth = Dimensions.get('window').width;

export const BottomSignUpComponent: React.FC<argsType> = ({ navigation, screenName }) => {
  const handleNavigateToEmailInput = () => {
    navigation.navigate('EmailInput', {
      authType: 'signUp',
    });
  };

  return (
    <View style={styles.bottomContainer}>
      <Text>まだアカウントをお持ちでないですか？</Text>
      <Pressable
        onPress={() => {
          handleNavigateToEmailInput();
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? `${dg.stateHoverBlack}` : `${dg.surface}`,
          },
          styles.pressable,
        ]}>
        <Text style={styles.submitText}>登録</Text>
      </Pressable>
    </View>
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
  logoWrap: {
    width: WindowWidth * 0.9,
    height: WindowWidth * 0.9 * 0.3,
    marginBottom: 30,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: dg.surface,
    borderTopColor: dg.border,
    borderTopWidth: 1,
  },
  pressable: {
    marginLeft: 10,
    width: 60,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  submitText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
});
