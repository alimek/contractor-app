import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../utils/theme';

interface Props {
  name: string;
  focused: boolean;
}

const TabBarIcon = ({ name, focused }: Props) => (
  <Icon
    name={name}
    size={25}
    color={focused ? theme.primaryColor : theme.disabledTabColor}
  />
);

export default TabBarIcon;
