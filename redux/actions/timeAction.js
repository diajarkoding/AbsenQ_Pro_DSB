import {TIME_GET, TIME_SET} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const timeGetSuccess = (data) => ({type: TIME_GET, payload: data});

export const timeGet = () => {
  return async (dispatch) => {
    try {
      await dispatch(fetchingRequest());

      var data = await dispatch(fetching('/time/get', 'GET'));
      if (data.content == 'OK') {
        await dispatch(timeGetSuccess(data.data));
        await dispatch(fetchingSuccess());
        console.log('Success; Time; Get;');
        return true;
      } else {
        console.log('Fail; Time; Get;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Time; Get;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const timeSetSuccess = (data) => ({type: TIME_SET});

export const timeSet = (param) => {
  return async (dispatch) => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();

      body.append('in', param.in);
      body.append('out', param.out);

      var data = await dispatch(fetching('/time/set', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(timeSetSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Time; Set;', data.data);
        return true;
      } else {
        console.log('Fail; Time; Set;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Time; Set;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
