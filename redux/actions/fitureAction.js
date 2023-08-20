import {
  PROPERTIES_GET,
  PROPERTIES_SET,
  FITURE_GET,
  FITURE_SET,
  FITURE_ACTIVE,
} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const fitureGetSuccess = data => ({type: FITURE_GET, payload: data});

export const fitureGet = () => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());

      var data = await dispatch(fetching('/fiture/get', 'GET'));
      if (data.content == 'OK') {
        await dispatch(fitureGetSuccess(data.data));
        await dispatch(fetchingSuccess());
        console.log('Success; Fiture; Get;');
        return true;
      } else {
        console.log('Fail; Fiture; Get;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Fiture; Get;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const fitureSetSuccess = () => ({type: FITURE_SET});

export const fitureSet = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('id', param.id);
      body.append('status', param.status);
      body.append('mandatory', param.mandatory);
      body.append('value', param.value);
      body.append('schedule', param.schedule);
      body.append('day', param.day);
      body.append('date_from', param.date_from);
      body.append('date_to', param.date_to);

      var data = await dispatch(fetching('/fiture/set', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(fitureSetSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Fiture; Set;', data.data);
        return true;
      } else {
        console.log('Fail; Fiture; Set;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Fiture; Set;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const fituresActiveSuccess = data => ({type: FITURE_ACTIVE, payload: data});

export const fitureActive = () => {
  return async dispatch => {
    let flag = false;
    try {
      let data = await dispatch(fetching('/fiture/active'));
      if (data.content == 'OK') {
        await dispatch(fituresActiveSuccess(data.data));
        console.log('SUCCESS; Fiture; Active;');
        flag = true;
      } else {
        console.log('Fail; Fiture; Active;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
      }
      return flag;
    } catch (err) {
      await dispatch(fetchingSuccess());
      console.log('Error; Fiture; Active; ', err);
      return false;
    }
  };
};
