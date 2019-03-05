// @ts-ignore
import { DefaultTheme } from 'react-native-ios-kit';

export interface ThemeInterface {
  primaryColor: string;
  disabledTabColor: string;
  borderColor: string;
  defaultTextColor: string;
  errorColor: string;
  successColor: string;
  fontFamily: string;
  moreColor: string;
  lessColor: string;
  equalColor: string;
}

const redColor = '#b02e00';
const greenColor = '#00b71a';

const theme: ThemeInterface = {
  primaryColor: '#4EbFDF',
  disabledTabColor: '#bcbcbc',
  borderColor: '#e5e5e5',
  defaultTextColor: '#5c5c5c',
  errorColor: redColor,
  successColor: greenColor,
  fontFamily: 'Verdana',
  moreColor: '#0069e0',
  equalColor: greenColor,
  lessColor: redColor,
};

const textStyle = {
  fontFamily: theme.fontFamily,
};

export const elementTheme = {
  Input: {
    leftIconContainerStyle: {
      margin: 0,
    },
    labelStyle: {
      ...textStyle,
      color: theme.defaultTextColor,
      fontSize: 11,
      fontWeight: 'normal',
    },
  },
  Button: {
    titleStyle: {
      ...textStyle,
      color: theme.primaryColor,
    },
  },
};

export default theme;
