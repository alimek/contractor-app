import produce from 'immer';
import { ON_DAY_PRESSED, BACK_TO_CALENDAR, SET_DAY_VIEW_HOURS } from '../actions/types';
import { IDayPreviewStore } from '../interfaces/store';

const initialState: IDayPreviewStore = {
  day: null,
  hours: '1',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ON_DAY_PRESSED:
      return produce(state, draft => {
        draft.day = action.day;
      });
    case BACK_TO_CALENDAR:
      return produce(state, draft => {
        draft.day = initialState.day;
      });
    case SET_DAY_VIEW_HOURS:
      return produce(state, draft => {
        draft.hours = action.hours;
      });
    default:
      return state;
  }
};
