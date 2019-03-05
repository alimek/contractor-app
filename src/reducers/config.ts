import { IConfigStore } from '../interfaces/store';

const initialState: IConfigStore = {
  hourPrice: 0,
  hoursPerDay: 8,
};

export default (state: IConfigStore = initialState, action: any) => {
  return state;
}
