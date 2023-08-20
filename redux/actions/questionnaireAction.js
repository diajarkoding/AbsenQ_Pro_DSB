import {HEALTH_Q} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const healthQSuccess = () => ({type: HEALTH_Q});

export const healthQ = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('temperature', param.temper);
      body.append('healthy', param.condit);
      body.append('work_from', param.status);

      var data = await dispatch(
        fetching('/questionnaire/health', 'POST', body),
      );
      if (data.content == 'OK') {
        await dispatch(healthQSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Questionnaire; Health;', data.data);
        return true;
      } else {
        console.log('Fail; Questionnaire; Health;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Questionnaire; Health;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
