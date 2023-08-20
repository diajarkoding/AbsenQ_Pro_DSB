import {TRACKING} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
  getImei,
} from './utilAction';
import * as errorM from '../errorM';

const trackingSuccess = data => ({type: TRACKING});

export const tracking = param => {
  return async (dispatch, getState) => {
    try {
      // await dispatch(fetchingRequest());
      await dispatch(getImei());
      const {imei1, imei2} = getState().utilReducer;
      var body = new FormData();
      body.append('lat', param.lat);
      body.append('lon', param.lon);
      body.append('imei1', imei1);
      body.append('imei2', imei2);

      var data = await dispatch(fetching('/tracking', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(fetchingSuccess());
        await dispatch(trackingSuccess());
        console.log('Success; Tracking; Tracking;');
        return true;
      } else {
        console.log('Fail; Tracking; Tracking;');
        console.log(data);
        // await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Tracking; Tracking;');
      console.log(err);
      // await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

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
