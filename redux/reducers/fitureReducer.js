import {FITURE_GET, FITURE_SET, FITURE_ACTIVE, HEALTH_Q} from '../types';

const initalState = {
  setFiture: false,
  fitures: [],
  active: [],
  health_q: false,
};

const fitureReducer = (state = initalState, action) => {
  switch (action.type) {
    case FITURE_GET:
      return {...state, fitures: action.payload};
    case FITURE_SET:
      return {...state, setFiture: true};
    case FITURE_ACTIVE:
      return {...state, active: action.payload};
    case HEALTH_Q:
      return {...state, health_q: true};
    default:
      return state;
  }
};

export default fitureReducer;
