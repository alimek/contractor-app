import { LOG_HOUR, ON_DAY_PRESSED } from './types';
import { Dispatch } from 'redux';
import { DateObject } from 'react-native-calendars';
import { IStore } from '../interfaces/store';
import { addHours } from '../utils/calendar';

export const onDayPressed = (day: DateObject) => (dispatch: Dispatch) => {
  dispatch({
    type: ON_DAY_PRESSED,
    day,
  });
};

export const addHour = (day: DateObject) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const { app, config, dayPreview }: IStore = getState();
  const { hourPrice } = config;
  const { description } = dayPreview;

  dispatch({
    type: LOG_HOUR,
    hours: addHours(app.hours, day, dayPreview.hours, description, hourPrice),
  });
};
