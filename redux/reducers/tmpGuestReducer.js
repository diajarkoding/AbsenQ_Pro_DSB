import {TMPGUEST, TMPGUESTPHOTO} from '../types';

const initalState = {
  date: null,
  location: null,
  purpose: null,
  photo: null,
  listt: [],
  name: null,
  email: null,
  phone: null,
};

const tmpGuestReducer = (state = initalState, action) => {
  switch (action.type) {
    case TMPGUEST:
      return {
        ...state,
        date: action.payload.date,
        location: action.payload.location,
        purpose: action.payload.purpose,
        listt: [...action.payload.listt],
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    case TMPGUESTPHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    default:
      return state;
  }
};

export default tmpGuestReducer;
