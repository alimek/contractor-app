import { IAppStore } from '../interfaces/store';
import moment from 'moment';
import { LOG_HOUR } from '../actions/types';
import produce from 'immer';

const initialState: IAppStore = {
  hours: {
    '2019-03-04': [
      {
        amount: 3,
        createdAt: moment().toISOString(),
        price: 23,
      },
    ],
    '2019-03-01': [
      {
        amount: 3,
        createdAt: moment().toISOString(),
        price: 23,
      },
      {
        amount: 5,
        createdAt: moment().toISOString(),
        price: 23,
      },
    ],
    '2019-03-03': [
      {
        amount: 7,
        createdAt: moment().toISOString(),
        price: 23,
      },
      {
        amount: 5,
        createdAt: moment().toISOString(),
        price: 23,
      },
    ],
  },
};

export default (state: IAppStore = initialState, action: any) => {
  switch (action.type) {
    case LOG_HOUR:
      return produce(state, draft => {
        draft.hours = action.hours;
      });
    default:
      return state;
  }
}
