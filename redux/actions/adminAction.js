import {CLEAR_GPS, CLEAR_IMEI, REGISTER} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const clearImeiSuccess = data => ({type: CLEAR_IMEI});

export const clearImei = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('email', param.email);

      var data = await dispatch(fetching('/adminMenu/clearImei', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(clearImeiSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Admin; Clear imei;');
        return true;
      } else {
        console.log('Fail; Admin; Clear imei;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Admin; Clear imei;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const clearGPSSuccess = data => ({type: CLEAR_GPS});

export const clearGPS = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('email', param.email);

      var data = await dispatch(fetching('/adminMenu/clearGPS', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(clearGPSSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Admin; clearGPS;');
        return true;
      } else {
        console.log('Fail; Admin; clearGPS;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Admin; clearGPS;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const registerSuccess = () => ({type: REGISTER});

export const register = param => {
  return async dispatch => {
    try {
      var photo = {uri: param.photo, name: 'img1.jpg', type: 'image/jpeg'};
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('name', param.name);
      body.append('nik', param.nik);
      body.append('email', param.email);
      body.append('password', param.password);
      body.append('phone', param.phone);
      body.append('imei1', param.imei1);
      body.append('imei2', param.imei2);
      body.append('photo', photo);
      body.append('code', param.code);
      body.append('companyName', param.companyName);
      body.append('description', param.description);

      var data = await dispatch(fetching('/user/create', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(registerSuccess());
        await dispatch(fetchingSuccess());
        console.log('SUCCESS; LoginAction; register;');
        return true;
      } else {
        console.log('FAIL; LoginAction; register;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('ERROR; LoginAction; register;', err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
