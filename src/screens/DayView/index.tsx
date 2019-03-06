import * as React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
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
import { backToCalendar } from '../../actions/day-preview';
import { CircleProgress, HeaderButton } from '../../components';
import { IStore } from '../../interfaces/store';
import { IHour } from '../../interfaces/app';
import { calculateDayLoggedHours } from '../../utils/calendar';
import { AddHourModal } from '../../containers';

interface IParams {
  day: DateObject;
  state: any;
  onClickPlus: () => void;
}

interface IDayViewPropTypes {
  hoursPerDay: number;
  loggedHours: number;
  addHoursValue: string;
  actions: {
    backToCalendar: Function;
  };
  hours: IHour[];
  navigation: NavigationScreenProp<any, IParams>;
}

interface State {
  isAddModalVisible: boolean;
}

class DayView extends React.Component<IDayViewPropTypes, State> {
  state = {
    isAddModalVisible: false,
  };

  static navigationOptions = ({ navigation }: any) => {
    const { params }: { params: IParams } = navigation.state;

    return {
      title: moment(params.day.dateString).format('LL'),
      headerRight: (
        <HeaderButton
          iconName="plus-circle"
          onPress={navigation.getParam('onClickPlus')}
        />
      ),
    };
  };

  constructor(props: IDayViewPropTypes) {
    super(props);

    const { navigation } = this.props;
    navigation.setParams({
      onClickPlus: this.toggleAddHourModal,
    });
  }

  componentWillUnmount(): void {
    const { actions } = this.props;
    const { backToCalendar } = actions;

    backToCalendar();
  }

  toggleAddHourModal = () => {
    this.setState({
      isAddModalVisible: !this.state.isAddModalVisible,
    });
  };

  render() {
    const {
      hoursPerDay,
      loggedHours,
      hours,
    } = this.props;

    const { isAddModalVisible } = this.state;
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
              <Value>{loggedHours.toFixed(2)}</Value>
            </Row>
            {leftHours > 0 ? (
              <Row>
                <Label>Left hours:</Label>
                <Value>{leftHours.toFixed(2)}</Value>
              </Row>
            ) : null}
          </DaySummaryContainer>
        </CardRow>
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
        <AddHourModal
          visible={isAddModalVisible}
          onClose={this.toggleAddHourModal}
        />
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
      hours: orderBy(hours, ['createdAt'], ['desc']),
    };
  },
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(
      { backToCalendar },
      dispatch,
    ),
  }),
)(DayView);
