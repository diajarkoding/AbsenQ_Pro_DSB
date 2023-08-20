import {
  FETCHING_REQUEST,
  FETCHING_SUCCESS,
  FETCHING_FAILURE,
  SESSION_EXPIRED,
  SESSION_VALID,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  GPS,
  IMEITYPE,
  VERSION,
} from '../types';

const initalState = {
  errorMessage: null,
  success: false,
  isFetching: false,
  token: null,
  lat: 0,
  lon: 0,
  version: false,
  session: false,
  imei1: null,
  imei2: null,
};

const utilReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCHING_REQUEST:
      return {...state, errorMessage: null, isFetching: true, success: false};
    case FETCHING_SUCCESS:
      return {...state, errorMessage: null, isFetching: false, success: true};
    case FETCHING_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
        success: false,
      };
    case SESSION_EXPIRED:
      return {...state, session: false};
    case SESSION_VALID:
      return {...state, session: true};
    case SAVE_TOKEN:
      return {...state, token: action.payload};
    case REMOVE_TOKEN:
      return {...state, token: null};
    case GPS:
      return {...state, lat: action.payload.lat, lon: action.payload.lon};
    case VERSION:
      return {...state, version: true};
    case IMEITYPE:
      return {
        ...state,
        imei1: action.payload.imei1,
        imei2: action.payload.imei2,
      };
    default:
      return state;
  }
};

export default utilReducer;
