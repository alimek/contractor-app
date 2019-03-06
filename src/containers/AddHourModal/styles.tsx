import styled from '../../utils/styled-components';
import { DefaultText } from '../../components';

export const Container = styled.View`
  flex: 1;
  margin: 20px 0;
`;

export const Legend = styled(DefaultText)<{ tab?: boolean, bottomMargin?: boolean }>`
  font-size: 15px;
  margin: 0 0 ${props => props.bottomMargin ? 20 : 5}px ${props => props.tab ? 15 : 5}px;
  color: ${props => props.theme.disabledTabColor};
`;
