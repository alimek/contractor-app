import * as React from 'react';
import moment from 'moment';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { DateObject } from 'react-native-calendars';

import { Container, Legend } from './styles';
import { Modal } from '../../components';
import { IStore } from '../../interfaces/store';
import { bindActionCreators } from 'redux';
import { addHour } from '../../actions/calendar';
import { setHours, setDescription } from '../../actions/day-preview';

interface Props {
  visible: boolean;
  onClose: () => void;
  day: DateObject | null;
  description: string;
  hours: string;
  actions: {
    setHours: (text: string) => void;
    setDescription: (text: string) => void;
    addHour: Function;
  };
}

const AddHourModal = ({
  visible,
  onClose,
  day,
  hours,
  actions,
  description,
}: Props) => (
  <Modal
    visible={visible}
    onClosed={onClose}
    header={
      day ? `Log hours for ${moment(day.dateString).format('LL')}` : undefined
    }
  >
    <Container>
      <Legend>You can use one of following pattern:</Legend>
      <Legend tab>* 1h 2m</Legend>
      <Legend tab bottomMargin>* 2 - just number</Legend>
      <Input
        value={hours}
        label="How many hours you wanna log?"
        onChangeText={actions.setHours}
        returnKeyType="done"
        maxLength={7}
      />
      <Input
        value={description}
        label="Description"
        onChangeText={actions.setDescription}
        multiline
      />
    </Container>
    <Button
      disabled={false}
      title="Log"
      onPress={() => {
        actions.addHour(day);
        onClose();
      }}
    />
  </Modal>
);

export default connect(
  (store: IStore) => ({
    hours: store.dayPreview.hours,
    description: store.dayPreview.description,
    day: store.dayPreview.day,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { setHours, addHour, setDescription },
      dispatch,
    ),
  }),
)(AddHourModal);
