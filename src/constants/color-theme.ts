import { DefaultTheme } from '@react-navigation/native';

import * as dg from '../constants/design-variables';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: `${dg.background}`,
  },
};

export default MyTheme;
