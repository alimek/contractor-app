import {
  BACK_TO_CALENDAR,
  SET_DAY_VIEW_DESC,
  SET_DAY_VIEW_HOURS,
} from './types';

export const backToCalendar = () => ({ type: BACK_TO_CALENDAR });

export const setHours = (hours: string) => ({
  type: SET_DAY_VIEW_HOURS,
  hours,
});

export const setDescription = (description: string) => ({
  type: SET_DAY_VIEW_DESC,
  description,
});
