import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = Animated.createAnimatedComponent(styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`);

export const Name = styled.Text`
  font-size: 30px;
  color: white;
  font-family: "Verdana";
`;

export const Square = Animated.createAnimatedComponent(styled.View<{ opacity: number, size: number }>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: ${props => props.theme.primaryColor};
  position: absolute;
  border-radius: 20px;
  opacity: ${props => props.opacity};
`);

export const Header = Animated.createAnimatedComponent(styled.View<{ animationFinished: boolean}>`
  background: ${props => props.animationFinished ? props.theme.primaryColor : 'transparent'};
  position: absolute;
  top: 50%;
  margin-top: -30px;
`);
