import * as React from 'react';

import { Container, Box, Header } from './styles';

interface Props {
  children: any;
  header?: string;
}

const Card = ({ children, header, ...others}: Props) => (
  <Container>
    {header ? <Header>{header}</Header> : null}
    <Box {...others}>{children}</Box>
  </Container>
);

export default Card;
