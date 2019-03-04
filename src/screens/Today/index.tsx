import * as React from 'react';

import { Container } from './styles';

interface ITodayPropTypes {

}

class Today extends React.Component<ITodayPropTypes> {
  public static navigationOptions = {
    title: 'Today',
  };

  render() {
    return (
      <Container/>
    );
  }
}

export default Today;
