import authReducer from './authReducer';
import utilReducer from './utilReducer';
import tmpReducer from './tmpReducer';
import absensiReducer from './absensiReducer';
import userReducer from './userReducer';
import timeReducer from './timeReducer';
import cardReducer from './cardReducer';
import fitureReducer from './fitureReducer';
import trackingReducer from './trackingReducer';
import tmpGuestReducer from './tmpGuestReducer';
import guestReducer from './guestReducer';
import {combineReducers} from 'redux';

import {LOGOUT} from '../types';

const appReducer = combineReducers({
  authReducer,
  utilReducer,
  tmpReducer,
  absensiReducer,
  userReducer,
  timeReducer,
  cardReducer,
  fitureReducer,
  trackingReducer,
  tmpGuestReducer,
  guestReducer,
});

export default (rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
});
