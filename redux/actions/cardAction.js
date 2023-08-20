import {CARD} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetchingCard,
} from './utilAction';
import moment from 'moment';
import md5 from '@smithy/md5-js';
import * as errorM from '../errorM';

const cardSuccess = data => ({type: CARD, payload: data});

export const card = () => {
  return async (dispatch, getState) => {
    try {
      const {whoami} = getState().authReducer;
      await dispatch(fetchingRequest());

      const timee = moment()
        .format('DD-MM-YYYY HH')
        .toString();

      var body = {
        password: md5(timee),
        nik: whoami.nik,
      };
      body = JSON.stringify(body);

      var data = await dispatch(fetchingCard(body));
      if (data.fullname) {
        await dispatch(cardSuccess(data));
        await dispatch(fetchingSuccess());
        console.log('Success; Card; Card;');
        return true;
      } else {
        console.log('Fail; Card; Card;');
        console.log(data);
        await dispatch(fetchingFailure(errorM.sistemDown));
        return false;
      }
    } catch (err) {
      console.log('Error; Card; Card;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
