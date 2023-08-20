import {
  LIVE,
  TMP_REGISTRASI,
  TMP_REGISTRASI_COMPANY,
  TMP_RESET,
  TMP_PHOTO,
} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetchingDetect,
  fetchingCompare,
} from './utilAction';
import * as errorM from '../errorM';

const tmpRegistrasiSave = param => ({type: TMP_REGISTRASI, payload: param});

export const tmpRegistrasi = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      await dispatch(tmpRegistrasiSave(param));
      await dispatch(fetchingSuccess());
      console.log('SUCCESS; LoginAction; tmpRegistrasi;');
      return true;
    } catch (err) {
      console.log('ERROR; LoginAction; ', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const tmpRegistrasiCompanySave = param => ({
  type: TMP_REGISTRASI_COMPANY,
  payload: param,
});

export const tmpRegistrasiCompany = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      await dispatch(tmpRegistrasiCompanySave(param));
      await dispatch(fetchingSuccess());
      console.log('SUCCESS; LoginAction; tmpRegistrasiCompany;');
      return true;
    } catch (err) {
      console.log('ERROR; LoginAction; tmpRegistrasiCompany;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const tmpResetSave = param => ({
  type: TMP_RESET,
  payload: param,
});

const liveCheckingSuccess = () => ({type: LIVE});

const tmpPhotoSave = param => ({type: TMP_PHOTO, payload: param});

export const tmpPhoto = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var data = await dispatch(fetchingDetect(param));
      if (data == 1) {
        await dispatch(liveCheckingSuccess());
        await dispatch(tmpPhotoSave(param));
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; LoginAction; tmpPhoto;');
        return true;
      } else {
        console.log('FAIL; LoginAction; tmpPhoto;');
        console.log(data);
        await dispatch(fetchingFailure('is it a person?'));
        return false;
      }
    } catch (err) {
      console.log('ERROR; LoginAction; tmpPhoto;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
