import * as React from 'react';

import { Container, Icon } from './styles';

interface Props {
  iconName: string;
  onPress: () => {};
}

const HeaderButton = ({ iconName, onPress }: Props) => (
  <Container onPress={onPress}>
    <Icon
      name={iconName}
    />
  </Container>
);

export default HeaderButton;
