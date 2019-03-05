import * as React from 'react';
// @ts-ignore
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import theme from '../../utils/theme';
import { Text, Desc } from './styles';

interface Props {
  percent: number;
}

const getColor = (percent: number): string => {
  if (percent === 100) {
    return theme.equalColor;
  }

  if (percent > 100) {
    return theme.moreColor;
  }

  return theme.lessColor;
};

const CircleProgress = (props: Props) => (
  <AnimatedCircularProgress
    size={120}
    width={15}
    fill={props.percent}
    rotation={0}
    lineCap="round"
    tintColor={getColor(props.percent)}
    backgroundColor={theme.borderColor}
    duration={1500}
  >
    {
      (fill: number) => (
        <React.Fragment>
          <Text>{`${Math.round(fill)}%`}</Text>
          <Desc>Daily hours</Desc>
        </React.Fragment>
      )
    }
  </AnimatedCircularProgress>
);

export default CircleProgress;
