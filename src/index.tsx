import * as React from 'react';
import { useScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as ElementThemeProvider } from 'react-native-elements';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

useScreens();

import { Intro, Calendar, Config, Summary, DayView } from './screens';
import theme, { elementTheme } from './utils/theme';
import { TabBarIcon } from './components';
import store, { persistor } from './utils/store';

const defaultNavigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: theme.primaryColor,
  },
};

const CalendarStack = createStackNavigator(
  {
    Calendar: {
      screen: Calendar,
    },
    DayView: {
      screen: DayView,
    },
  },
  {
    defaultNavigationOptions,
  },
);

const SummaryStack = createStackNavigator(
  {
    Summary: {
      screen: Summary,
    },
  },
  {
    defaultNavigationOptions,
  },
);

const ConfigStack = createStackNavigator({
  Config: {
    screen: Config,
  },
}, {
  defaultNavigationOptions,
});

const Navigator = createBottomTabNavigator(
  {
    CalendarStack: {
      screen: CalendarStack,
      navigationOptions: {
        tabBarLabel: 'Calendar',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabBarIcon name="calendar-alt" focused={focused} />
        ),
      },
    },
    SummaryStack: {
      screen: SummaryStack,
      navigationOptions: {
        tabBarLabel: 'Summary',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabBarIcon name="chart-line" focused={focused} />
        ),
      },
    },
    ConfigStack: {
      screen: ConfigStack,
      navigationOptions: {
        tabBarLabel: 'Config',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabBarIcon name="cogs" focused={focused} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.primaryColor,
    },
  },
);

const ConfigurationNavigator = createSwitchNavigator({
  Intro,
  Navigator,
});

const Navigation = createAppContainer(ConfigurationNavigator);

export default () => (
  <ThemeProvider theme={theme}>
    <ElementThemeProvider theme={elementTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </ElementThemeProvider>
  </ThemeProvider>
);
