import {TIME_GET, TIME_SET} from '../types';

const initalState = {
  set: false,
  in: null,
  out: null,
};

const timeReducer = (state = initalState, action) => {
  switch (action.type) {
    case TIME_GET:
      console.log(action.payload);
      return {
        ...state,
        in: action.payload.in != null ? action.payload.in : '08:00:00',
        out: action.payload.out != null ? action.payload.out : '17:00:00',
      };
    case TIME_SET:
      return {
        ...state,
        set: true,
      };

    default:
      return state;
  }
};

export default timeReducer;
