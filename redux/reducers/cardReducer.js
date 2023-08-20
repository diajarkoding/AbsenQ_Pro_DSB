import {CARD} from '../types';

const initalState = {
  photo: null,
  name: null,
  phone: null,
  email: null,
  job: null,
  status: null,
};

const cardReducer = (state = initalState, action) => {
  switch (action.type) {
    case CARD:
      return {
        ...state,
        photo: action.payload.photo,
        name: action.payload.fullname,
        phone: action.payload.phone,
        email: action.payload.email,
        job: action.payload.job,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default cardReducer;
