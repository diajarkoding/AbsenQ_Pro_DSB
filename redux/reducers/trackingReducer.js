import {TRACKING} from '../types';

const initalState = {
  tracking: false,
};

const trackingReducer = (state = initalState, action) => {
  switch (action.type) {
    case TRACKING:
      return {...state, tracking: true};
    default:
      return state;
  }
};

export default trackingReducer;
