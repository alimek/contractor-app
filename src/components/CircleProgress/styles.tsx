import styled from '../../utils/styled-components';
import DefaultText from '../DefaultText';

export const Text = styled(DefaultText)`
  font-size: 30px;
  color: ${props => props.theme.defaultTextColor};
`;
export const Desc = styled(DefaultText)`
  font-size: 10px;
  color: ${props => props.theme.defaultTextColor};
  text-align: center;
`;
