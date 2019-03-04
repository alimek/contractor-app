import * as React from 'react';
import { useScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

useScreens();

import { Intro, Today, Config } from './screens';
import theme from './utils/theme';

const TodayStack = createStackNavigator({
  Today: {
    screen: Today,
  },
});

const ConfigStack = createStackNavigator({
  Config: {
    screen: Config,
  },
});

const Navigator = createBottomTabNavigator({
  TodayStack: {
    screen: TodayStack,
    navigationOptions: {
      tabBarLabel: 'Today',
    },
  },
  ConfigStack: {
    screen: ConfigStack,
    navigationOptions: {
      tabBarLabel: 'Config',
    },
  },
});

const ConfigurationNavigator = createSwitchNavigator({
  Intro,
  Navigator,
});

const Navigation = createAppContainer(ConfigurationNavigator);

export default () => (
  <ThemeProvider theme={theme}>
    <Navigation />
  </ThemeProvider>
);
