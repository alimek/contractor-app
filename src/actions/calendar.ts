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

export const addHour = (day: DateObject, amount: string) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const { app, config }: IStore = getState();
  const { hourPrice } = config;
  const { hours } = app;

  dispatch({
    type: LOG_HOUR,
    hours: addHours(hours, day, amount, hourPrice),
  });
};
