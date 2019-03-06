import { DateObject } from 'react-native-calendars';
import { Store } from 'redux';
import { IHours } from './app';

export interface IAppStore {
  hours: IHours;
}

export interface IDayPreviewStore {
  day: DateObject | null;
  hours: string;
  description: string;
}

export interface IConfigStore {
  hourPrice: number;
  hoursPerDay: number;
}

export interface IStore extends Store {
  app: IAppStore;
  dayPreview: IDayPreviewStore;
  config: IConfigStore;
}
