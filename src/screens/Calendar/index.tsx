import * as React from 'react';
import { CalendarList, DateObject, DotMarking } from 'react-native-calendars';

import { Container } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { onDayPressed } from '../../actions/calendar';
import { NavigationScreenProp } from 'react-navigation';
import { IStore } from '../../interfaces/store';
import { prepareMarkedDates } from '../../utils/calendar';
import moment from 'moment';

interface ICalendarPropTypes {
  navigation:  NavigationScreenProp<any, any>;
  markedDated: {
    [key: string]: DotMarking;
  }
  actions: {
    onDayPressed: Function;
  };
}

class Calendar extends React.Component<ICalendarPropTypes> {
  public static navigationOptions = {
    title: 'Calendar',
  };

  onDayPressed = (day: DateObject) => {
    const { navigation, actions } = this.props;
    const { onDayPressed } = actions;

    onDayPressed(day);
    navigation.navigate('DayView', {
      day,
    });
  };

  render() {
    const { markedDated } = this.props;

    const today = moment().format('YYYY-MM-DD');

    return (
      <Container>
        <CalendarList
          pastScrollRange={5}
          futureScrollRange={1}
          scrollEnabled
          current={today}
          maxDate={today}
          showScrollIndicator
          markedDates={markedDated}
          onDayPress={this.onDayPressed}
          firstDay={1}
          theme={{
            'stylesheet.day.basic': {
              dot: {
                width: 20,
                height: 5,
                marginTop: 1,
                borderRadius: 2,
                opacity: 0,
              },
            },
          }}
      />
      </Container>
    );
  }
}

export default connect(
  (store: IStore) => ({
    markedDated: prepareMarkedDates(store.app.hours, store.config),
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators({ onDayPressed }, dispatch),
  }),
)(Calendar);
