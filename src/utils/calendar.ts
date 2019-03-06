import { DateObject, DotMarking } from 'react-native-calendars';
import moment, { min } from 'moment';

import { IHours, IHour } from '../interfaces/app';
import theme from './theme';
import { IConfigStore } from '../interfaces/store';
import produce from 'immer';

const more = theme.moreColor;
const equal = theme.equalColor;
const less = theme.lessColor;

const getDotConfig = (doneHours: number, config: IConfigStore): string => {
  if (doneHours > config.hoursPerDay) {
    return more;
  }

  if (doneHours === config.hoursPerDay) {
    return equal;
  }

  return less;
};

export const prepareMarkedDates = (
  hours: IHours,
  config: IConfigStore,
): {
  [key: string]: DotMarking;
} => {
  const days: string[] = Object.keys(hours);
  const markingType: {
    [key: string]: DotMarking;
  } = {};

  days.forEach((day: string) => {
    let doneHours = 0;
    hours[day].forEach(hour => {
      doneHours += hour.amount;
    });

    markingType[day] = {
      marked: true,
      dotColor: getDotConfig(doneHours, config),
    };
  });

  return markingType;
};

export const calculateDayLoggedHours = (hours: IHour[] | undefined): number => {
  let total = 0;

  if (!hours) {
    return total;
  }

  hours.forEach(hour => {
    total += hour.amount;
  });

  return total;
};

export const addHours = (
  hours: IHours,
  day: DateObject,
  amount: string,
  description: string,
  price: number,
): IHours => {
  const jiraRegex = /^(?:(?<hours>\d+)h\s*)?(?:(?<minutes>\d+)m\s*)?$/;
  const isNumber = /^[0-9]+((\.|\,)[0-9][0-9]?)?/.test(amount);
  const isJiraPattern = jiraRegex.test(amount);


  if (!isNumber && !isJiraPattern) {
    return hours;
  }

  let correctAmount: number = parseFloat(amount);
  if (isJiraPattern) {
    correctAmount = 0;

    const [value, hours, minutes]: any = amount.match(jiraRegex);
    if (hours) {
      correctAmount += parseInt(hours, 10);
    }

    if (minutes) {
      correctAmount += parseInt(minutes, 10) / 60;
    }
  }

  return produce(hours, draft => {
    const dayString = moment(day.dateString).format('YYYY-MM-DD');

    if (!draft[dayString]) {
      draft[dayString] = [];
    }

    draft[dayString].push({
      amount: parseFloat(correctAmount.toFixed(2)),
      price,
      description,
      createdAt: moment().toISOString(),
    });
  });
};
