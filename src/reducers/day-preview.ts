import produce from 'immer';
import { ON_DAY_PRESSED, BACK_TO_CALENDAR, SET_DAY_VIEW_HOURS, SET_DAY_VIEW_DESC } from '../actions/types';
import { IDayPreviewStore } from '../interfaces/store';

const initialState: IDayPreviewStore = {
  day: null,
  hours: '1',
  description: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_DAY_PRESSED:
      return produce(state, draft => {
        draft.day = action.day;
      });
    case BACK_TO_CALENDAR:
      return initialState;
    case SET_DAY_VIEW_HOURS:
      return produce(state, draft => {
        draft.hours = action.hours;
      });
    case SET_DAY_VIEW_DESC:
      return produce(state, draft => {
        draft.description = action.descriptiion;
      });
    default:
      return state;
  }
};
