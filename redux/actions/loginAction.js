import {LOGIN, LOGOUT, WHOAMI, WHATAMI, RESET} from '../types';
import {AsyncStorage} from 'react-native';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
  fetchingCompare,
  getImei,
  saveToken,
  removeToken,
} from './utilAction';
import {fitureActive} from './fitureAction';
import * as errorM from '../errorM';

const loginSuccess = () => ({type: LOGIN});
export const logoutSuccess = () => ({type: LOGOUT});

const whoamiSuccess = data => ({type: WHOAMI, payload: data});
const whatamiSuccess = data => ({type: WHATAMI, payload: data});

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
        await dispatch(removeUser());
        await dispatch(resetSuccess());
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; LoginAction; reset;');
        return true;
      } else {
        console.log('FAIL; LoginAction; reset;', data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('ERROR; LoginAction; reset;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const removeUser = data => {
  return async dispatch => {
    try {
      const photo = await AsyncStorage.getItem('photo');
      if (photo != null) {
        await AsyncStorage.removeItem('photo');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        console.log('SUCCESS; LoginAction; removeUser;');
      } else console.log('SUCCESS; LoginAction; removeUser; data not exist;');
    } catch (err) {
      console.log('ERROR; LoginAction; removeUser;', err);
    }
  };
};

export const saveUser = data => {
  return async dispatch => {
    try {
      const photo = await AsyncStorage.getItem('photo');
      if (photo == null) {
        // await dispatch(getSecret());
        await AsyncStorage.setItem('photo', data.photo);
        await AsyncStorage.setItem('email', data.email);
        await AsyncStorage.setItem('password', data.password);
        console.log('SUCCESS; LoginAction; saveUser;', data.email);
      } else console.log('SUCCESS; LoginAction; saveUser; data exist;');
    } catch (err) {
      console.log('ERROR; LoginAction; saveUser;', err);
    }
  };
};

export const login = param => {
  return async (dispatch, getState) => {
    try {
      await dispatch(fetchingRequest());
      await dispatch(getImei());
      const {imei1, imei2} = getState().utilReducer;
      console.log(imei1, imei2);
      var body = new FormData();
      body.append('email', param.email);
      body.append('password', param.password);
      body.append('imei1', imei1);
      body.append('imei2', imei2);

      var data = await dispatch(fetching('/login', 'POST', body));
      if (data.content == 'OK') {
        var tmp = {
          photo: data.data.user.photo,
          email: param.email,
          password: param.password,
        };
        await AsyncStorage.setItem('token', 'Bearer ' + data.data.token);
        await dispatch(saveToken('Bearer ' + data.data.token));
        await dispatch(whoamiSuccess(data.data.user));
        await dispatch(whatamiSuccess(data.data.user.RoleId));
        await dispatch(saveUser(tmp));
        await dispatch(fitureActive());
        await dispatch(loginSuccess());
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; LoginAction; login;', data.data.user.email);
        return true;
      } else {
        console.log('FAIL; LoginAction; login;', data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('ERROR; LoginAction; login;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const loginByFace = param => {
  return async (dispatch, getState) => {
    try {
      await dispatch(fetchingRequest());
      await dispatch(getImei());
      const {imei1, imei2} = getState().utilReducer;
      const photo = await AsyncStorage.getItem('photo');
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      const body = new FormData();
      body.append('email', email);
      body.append('password', password);
      body.append('imei1', imei1);
      body.append('imei2', imei2);

      const result = await dispatch(fetchingCompare(param.photo, photo));
      if (result >= 80) {
        const data = await dispatch(fetching('/login', 'POST', body));
        if (data.content == 'OK') {
          await AsyncStorage.setItem('token', 'Bearer ' + data.data.token);
          await dispatch(saveToken('Bearer ' + data.data.token));
          await dispatch(whoamiSuccess(data.data.user));
          await dispatch(whatamiSuccess(data.data.user.RoleId));
          await dispatch(fitureActive());
          await dispatch(loginSuccess());
          await dispatch(fetchingSuccess());
          console.log(
            'SUCCESS; LoginAction; loginByFace;',
            data.data.user.email,
          );
          return true;
        } else {
          console.log('FAIL; LoginAction; loginByFace;', data);
          await dispatch(fetchingFailure(data.error));
          return false;
        }
      } else if (result < 80) {
        await dispatch(
          fetchingFailure('Not the same person, please use it wisely'),
        );
        return false;
      }
    } catch (err) {
      console.log('ERROR; LoginAction; loginByFace;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      await AsyncStorage.removeItem('token');
      await dispatch(removeToken());
      await dispatch(logoutSuccess());
      await dispatch(fetchingSuccess());
      console.log('SUCCESS; LoginAction; logout;');
      return true;
    } catch (err) {
      console.log('ERROR; LoginAction; logout;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
