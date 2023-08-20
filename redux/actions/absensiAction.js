import {
  ABSENSI_CREATE,
  ABSENSI_ALL_BY7,
  ABSENSI_ALL_PERCOMPANY2,
  ABSENSI_LOADING,
  ABSENSI_ALL_PERCOMPANY_REFRESH,
  ABSENSI_REFRESHING,
} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
  fetchingCompare,
  getGPS,
  sessionExpired,
} from './utilAction';
import * as errorM from '../errorM';

const absensiCreateSuccess = () => ({type: ABSENSI_CREATE});

const absensiAllBy7Success = data => ({type: ABSENSI_ALL_BY7, payload: data});

const absensiAllPerCompanySuccess = data => ({
  type: ABSENSI_ALL_PERCOMPANY2,
  payload: data,
});

const absensiLoading = () => ({type: ABSENSI_LOADING});

export const absensiCreate = param => {
  return async (dispatch, getState) => {
    try {
      await dispatch(fetchingRequest());
      var gps = await dispatch(getGPS());
      const {lat, lon} = getState().utilReducer;
      const {whoami} = getState().authReducer;
      var result = await dispatch(fetchingCompare(param.photo, whoami.photo));
      var photo = {uri: param.photo, name: 'img1.jpg', type: 'image/jpeg'};
      var body = new FormData();
      body.append('photo', photo);
      body.append('lat', lat);
      body.append('lon', lon);
      body.append('result', result);

      console.log(result);
      if (gps && result >= 80) {
        var data = await dispatch(fetching('/absensi/create', 'POST', body));
        if (data.content == 'OK') {
          await dispatch(absensiCreateSuccess());
          await dispatch(fetchingSuccess());
          console.log('Success; Absensi; Create;');
          return true;
        } else {
          console.log('Fail; Absensi; Create;');
          console.log(data);
          await dispatch(fetchingFailure(data.error));
          return false;
        }
      } else if (result < 80) {
        await dispatch(fetchingFailure('Person not match'));
        return false;
      } else {
        await dispatch(fetchingFailure('GPS error'));
        return false;
      }
    } catch (err) {
      console.log('Error; Absensi; Create;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const absensiAllBy7 = () => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());

      var data = await dispatch(fetching('/absensi/allBy7', 'GET'));
      if (data.content == 'OK') {
        // console.log(data.data);
        await dispatch(absensiAllBy7Success(data.data));
        await dispatch(fetchingSuccess());
        console.log('Success; Absensi; All;');
        return true;
      } else {
        console.log('Fail; Absensi; All;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Absensi; All;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const absensiAllPerCompany = () => {
  return async (dispatch, getState) => {
    try {
      const {
        next_page,
        per_page,
        last_page,
        isLoading,
        isRefreshing,
      } = getState().absensiReducer;
      if (next_page > last_page || isLoading || isRefreshing) return true;

      await dispatch(absensiLoading());

      var body = new FormData();
      body.append('page', next_page);
      body.append('pageSize', per_page);

      var data = await dispatch(
        fetching('/absensi/allPerCompany', 'POST', body),
      );
      if (data.content == 'OK') {
        // console.log(data.data);
        await dispatch(absensiAllPerCompanySuccess(data.data));
        // await dispatch(fetchingSuccess());
        console.log(
          'Success; Absensi; All; page: ' +
            next_page +
            ' pageSize: ' +
            per_page,
        );
        return true;
      } else {
        console.log('Fail; Absensi; All;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Absensi; All;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const absensiAllPerCompanyRefreshSuccess = data => ({
  type: ABSENSI_ALL_PERCOMPANY_REFRESH,
  payload: data,
});

const absensiRefreshing = () => ({type: ABSENSI_REFRESHING});

export const absensiAllPerCompanyRefresh = () => {
  return async (dispatch, getState) => {
    try {
      const {per_page, isLoading, isRefreshing} = getState().absensiReducer;
      if (isLoading || isRefreshing) return true;
      await dispatch(absensiRefreshing());

      var body = new FormData();
      body.append('page', 0);
      body.append('pageSize', per_page);

      var data = await dispatch(
        fetching('/absensi/allPerCompany', 'POST', body),
      );
      if (data.content == 'OK') {
        await dispatch(absensiAllPerCompanyRefreshSuccess(data.data));
        console.log('Success; Absensi; All; refresh pageSize: ' + per_page);
        return true;
      } else {
        console.log('Fail; Absensi; All;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Absensi; All;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
