import {RESET, REQ_RESET} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import {tmpResetSave} from './tmpAction';
import * as errorM from '../errorM';

import {AsyncStorage} from 'react-native';

const resetSuccess = data => ({type: RESET});

export const reset = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('email', param.email);
      body.append('nik', param.nik);
      body.append('phone', param.phone);
      body.append('otp', param.otp);
      body.append('password', param.password);
      body.append('repass', param.repass);

      var data = await dispatch(fetching('/user/resetPass', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(resetSuccess());
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; ResetAction; reset;');
        return true;
      } else {
        console.log('FAIL; ResetAction; reset;', data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('ERROR; ResetAction; reset;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const reqResetSuccess = data => ({type: REQ_RESET});

export const reqReset = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('email', param.email);
      body.append('nik', param.nik);
      body.append('phone', param.phone);

      var data = await dispatch(fetching('/user/reqResetPass', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(tmpResetSave(param));
        await dispatch(reqResetSuccess());
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; ResetAction; reset;');
        return true;
      } else {
        console.log('FAIL; ResetAction; reset;', data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('ERROR; ResetAction; reset;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
