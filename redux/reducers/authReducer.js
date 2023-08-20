import {
  LOGIN,
  LOGOUT,
  WHOAMI,
  WHATAMI,
  REGISTER,
  LIVE,
  RESET,
  REQ_RESET,
} from '../types';

const initalState = {
  login: false,
  whoami: null, //data user
  whatami: null, //role
  register: false,
  live: false,
  reset: false,
  reqReset: false,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, login: true};
    case WHOAMI:
      return {...state, whoami: action.payload};
    case WHATAMI:
      return {...state, whatami: action.payload};
    case REGISTER:
      return {...state, register: true};
    case LIVE:
      return {...state, live: true};
    case RESET:
      return {...state, reset: true};
    case REQ_RESET:
      return {...state, reqReset: true};
    default:
      return state;
  }
};

export default authReducer;
