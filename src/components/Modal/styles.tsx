import styled from '../../utils/styled-components';

import DefaultText from '../DefaultText';

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 80px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex-direction: column;
  padding: 5px 20px 20px;
`;

export const Header = styled(DefaultText)`
  text-align: center;
  font-size: 15px;
  margin: 5px 0;
  font-weight: bold;
`;

export const Slider = styled.View`
  width: 100px;
  height: 5px;
  background-color:  ${props => props.theme.borderColor};;
  border: ${props => props.theme.borderColor};
  border-radius: 5px;
  align-self: center;
`;
