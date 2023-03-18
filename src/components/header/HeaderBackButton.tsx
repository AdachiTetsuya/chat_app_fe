import { StackActions, useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as dg from 'constants/design-variables';
import LeftIcon from 'icons/left';

export const HeaderBackButton = ({ screenName }: { screenName: string }) => {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.dispatch(popAction);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? dg.stateHoverBlack : 'white',
          },
          styles.LeftIconWrap,
        ]}>
        <LeftIcon />
      </Pressable>
      <Text style={styles.title}>{screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  LeftIconWrap: {
    borderRadius: 20,
    padding: 8,
  },
  title: {
    paddingLeft: 12,
    fontSize: 19,
    color: dg.highEmphasisBlack,
    fontWeight: '500',
    width: 250,
  },
});
