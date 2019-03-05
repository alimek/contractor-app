import styled from '../../utils/styled-components';
import DefaultText from '../DefaultText';

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const Header = styled(DefaultText)`
  text-align: left;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: ${props => props.theme.defaultTextColor};
`;

export const Box = styled.View`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: white;
  box-shadow: 0 5px 2px #ededed;
`;
