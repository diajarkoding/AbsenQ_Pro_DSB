import {
  TMP_REGISTRASI,
  TMP_REGISTRASI_COMPANY,
  TMP_REGISTRASI_REMOVE,
  TMP_RESET,
  TMP_PHOTO,
  TMP_PHOTO_REMOVE,
} from '../types';

const initalState = {
  name: null,
  email: null,
  nik: null,
  phone: null,
  companyName: null,
  companyCode: null,
  companyDesc: null,
  photo: null,
  password: null,
};

const tmpReducer = (state = initalState, action) => {
  switch (action.type) {
    case TMP_REGISTRASI:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        nik: action.payload.nik,
        phone: action.payload.phone,
        password: action.payload.password,
      };
    case TMP_REGISTRASI_COMPANY:
      return {
        ...state,
        companyName: action.payload.companyName,
        companyCode: action.payload.companyCode,
        companyDesc: action.payload.companyDesc,
      };
    case TMP_REGISTRASI_REMOVE:
      return {
        ...state,
        name: null,
        email: null,
        nik: null,
        phone: null,
        companyName: null,
        companyCode: null,
        companyDesc: null,
        photo: null,
        password: null,
      };
    case TMP_RESET:
      return {
        ...state,
        email: action.payload.email,
        nik: action.payload.nik,
        phone: action.payload.phone,
      };
    case TMP_PHOTO:
      return {...state, photo: action.payload};
    case TMP_PHOTO_REMOVE:
      return {...state, photo: null};
    default:
      return state;
  }
};

export default tmpReducer;
