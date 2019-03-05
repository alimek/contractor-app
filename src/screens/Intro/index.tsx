import * as React from 'react';
import { Animated, ViewStyle } from 'react-native';

import { Container, Name, Square, Header } from './styles';
import { NavigationScreenProp } from 'react-navigation';

interface ISquareConfig {
  size: number;
  opacity: number;
  startRotate: number;
  time: number;
  from: number;
  to: number;
  style?: ViewStyle;
}

const squares: ISquareConfig[] = [
  {
    size: 500,
    opacity: 0.5,
    startRotate: 45,
    time: 8000,
    from: 1,
    to: 0,
  },
  {
    size: 500,
    opacity: 0.15,
    startRotate: 45,
    time: 6000,
    from: 1,
    to: 0,
  },
  {
    size: 500,
    opacity: 0.6,
    startRotate: 45,
    time: 10000,
    from: 1,
    to: 0,
  },
];

interface State {
  animations: Animated.Value[];
  intro: Animated.Value;
}

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class Intro extends React.Component<Props, State> {
  state = {
    animations: squares.map(config => new Animated.Value(config.from)),
    intro: new Animated.Value(100),
  };

  constructor(props: any) {
    super(props);

    this.startAnimations();
    this.scaleDown();
  }

  scaleDown = () => {
    Animated.timing(this.state.intro, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(this.switchToApp, 200);
  };

  switchToApp = () => {
    this.props.navigation.navigate('Navigator');
  };

  startAnimations = () => {
    const { animations } = this.state;
    squares.forEach((config, index) => {
      this.flipAnimation(config, animations[index]);
    });
  };

  flipAnimation = (config: ISquareConfig, animation: Animated.Value) => {
    Animated.timing(animation, {
      toValue: config.to,
      duration: config.time,
      useNativeDriver: true,
    }).start(() => this.flopAnimation(config, animation));
  };

  flopAnimation = (config: ISquareConfig, animation: Animated.Value) => {
    Animated.timing(animation, {
      toValue: config.from,
      duration: config.time,
      useNativeDriver: true,
    }).start(() => this.flipAnimation(config, animation));
  };

  render() {
    const { animations, intro } = this.state;

    return (
      <Container
        style={{
          transform: [
            {
              scale: intro.interpolate({
                inputRange: [0, 80, 100],
                outputRange: [1, 1.8, 3],
              }),
            },
          ],
        }}
      >
        {squares.map((square, index) => (
          <Square
            key={index}
            opacity={square.opacity}
            size={square.size}
            style={{
              ...square.style,
              transform: [
                {
                  scale: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                  }),
                },
                {
                  rotate: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      `${square.startRotate}deg`,
                      `${square.startRotate + 360}deg`,
                    ],
                  }),
                },
              ],
            }}
          />
        ))}
        <Header>
          <Name>Contractor</Name>
        </Header>
      </Container>
    );
  }
}

export default Intro;
