import {CLEAR_IMEI} from '../types';

const initalState = {
  clearImei: false,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case CLEAR_IMEI:
      return {...state, clearImei: true};
    default:
      return state;
  }
};

export default authReducer;
