import * as React from 'react';

import { Container } from './styles';

interface ISummaryPropTypes {

}

class Summary extends React.Component<ISummaryPropTypes> {
  public static navigationOptions = {
    title: 'Summary',
  };

  render() {
    return (
      <Container/>
    );
  }
}

export default Summary;
