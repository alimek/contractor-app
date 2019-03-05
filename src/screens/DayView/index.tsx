import * as React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Input, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { orderBy } from 'lodash';

import {
  Container,
  Label,
  Row,
  DaySummaryContainer,
  Value,
  Card,
  CardRow,
  TimeContainer,
  TimeText,
  Placeholder,
} from './styles';
import { DateObject } from 'react-native-calendars';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { backToCalendar, setHours } from '../../actions/day-preview';
import { addHour } from '../../actions/calendar';
import { CircleProgress } from '../../components';
import { IStore } from '../../interfaces/store';
import { IHour } from '../../interfaces/app';
import { calculateDayLoggedHours } from '../../utils/calendar';

interface IParams {
  day: DateObject;
  state: any;
}

interface IDayViewPropTypes {
  hoursPerDay: number;
  loggedHours: number;
  addHoursValue: string;
  day: DateObject | null;
  actions: {
    backToCalendar: Function;
    setHours: (text: string) => void;
    addHour: Function;
  };
  hours: IHour[];
  navigation: NavigationScreenProp<any, IParams>;
}

class DayView extends React.Component<IDayViewPropTypes> {
  static navigationOptions = ({ navigation }: any) => {
    const { params }: { params: IParams } = navigation.state;

    return {
      title: moment(params.day.dateString).format('LL'),
    };
  };

  componentWillUnmount(): void {
    const { actions } = this.props;
    const { backToCalendar } = actions;

    backToCalendar();
  }

  render() {
    const {
      hoursPerDay,
      loggedHours,
      hours,
      actions,
      addHoursValue,
      day,
    } = this.props;

    const leftHours = hoursPerDay - loggedHours;

    return (
      <Container>
        <CardRow header="Day Summary">
          <CircleProgress percent={(loggedHours / hoursPerDay) * 100} />
          <DaySummaryContainer>
            <Row>
              <Label>Hours per day:</Label>
              <Value>{hoursPerDay}</Value>
            </Row>
            <Row>
              <Label>Logged hours:</Label>
              <Value>{loggedHours}</Value>
            </Row>
            {
              leftHours > 0 ?
                <Row>
                  <Label>Left hours:</Label>
                  <Value>{leftHours}</Value>
                </Row> : null
            }
          </DaySummaryContainer>
        </CardRow>
        <Card header="Log hours">
          <Input
            value={addHoursValue}
            label="How many hours you wanna log?"
            onChangeText={actions.setHours}
          />
          <Button
            disabled={addHoursValue.length === 0}
            title="Log"
            type="clear"
            onPress={() => actions.addHour(day, addHoursValue)}
          />
        </Card>
        <Card header="Logged hours">
          <FlatList
            data={hours}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{
                  padding: 5,
                }}
                leftIcon={
                  <TimeContainer>
                    <TimeText>{moment(item.createdAt).format('LT')}</TimeText>
                  </TimeContainer>
                }
                title={`${item.amount.toString()} hours`}
              />
            )}
            ListEmptyComponent={
              <Placeholder>You haven't logged anything yet</Placeholder>
            }
          />
        </Card>
      </Container>
    );
  }
}

export default connect(
  (store: IStore, ownProps: IDayViewPropTypes) => {
    const dateString = moment(
      ownProps.navigation.state.params.day.dateString,
    ).format('YYYY-MM-DD');

    const hours = store.app.hours[dateString];

    return {
      hoursPerDay: store.config.hoursPerDay,
      loggedHours: calculateDayLoggedHours(hours),
      addHoursValue: store.dayPreview.hours,
      day: store.dayPreview.day,
      hours: orderBy(hours, ['createdAt'],  ['desc']),
    };
  },
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(
      { backToCalendar, setHours, addHour },
      dispatch,
    ),
  }),
)(DayView);
