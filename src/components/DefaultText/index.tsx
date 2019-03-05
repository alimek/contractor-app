import * as React from 'react';
import { TextProps } from 'react-native';

import { Text } from './styles';

interface Props extends TextProps {
  children: any;
}

const DefaultText = (props: Props) => (
  <Text {...props}>
    {props.children}
  </Text>
);

export default DefaultText;
