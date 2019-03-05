import styled from '../../utils/styled-components';

export const Text = styled.Text`
  color: ${props => props.theme.defaultTextColor};
  font-size: 10px;
  font-family: ${props => props.theme.fontFamily};
`;
