import { combineReducers } from 'redux';

import app from './app';
import dayPreview from './day-preview';
import config from './config';

export default combineReducers({
  app,
  dayPreview,
  config,
});
