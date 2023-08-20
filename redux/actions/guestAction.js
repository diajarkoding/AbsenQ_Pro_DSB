import {
  REGISTERGUEST,
  GUESTUSER,
  GUESTADMIN,
  GUESTADMIN_LOADING,
  GUESTADMIN_REFRESHING,
  GUESTADMIN_REFRESH,
  GUESTCHECK,
  GUESTMEETING,
} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const regisGuestSuccess = data => ({type: REGISTERGUEST});

export const regisGuest = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var photo = {uri: param.photo, name: 'img1.jpg', type: 'image/jpeg'};
      var body = new FormData();
      // var guests = Object.assign({}, ...param.guests);
      var guests = JSON.stringify(param.guests);
      console.log(guests);
      body.append('guests', guests);
      body.append('location', param.location);
      body.append('purpose', param.purpose);
      body.append('photo', photo);
      body.append('date', param.date);

      console.log(body);

      var data = await dispatch(fetching('/guest/create_v2', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(regisGuestSuccess());
        await dispatch(fetchingSuccess());
        console.log('Success; Guest; regisGuest;');
        return true;
      } else {
        console.log('Fail; Guest; regisGuest;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; regisGuest;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const guestUserSuccess = data => ({type: GUESTUSER, payload: data});

export const guestUser = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var data = await dispatch(fetching('/guest/check'));

      if (data.content == 'OK') {
        await dispatch(guestUserSuccess(data.data));
        await dispatch(fetchingSuccess());
        console.log('Success; Guest; guestUser;');
        return true;
      } else {
        console.log('Fail; Guest; guestUser;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestUser;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const guestAdminLoading = () => ({type: GUESTADMIN_LOADING});

const guestAdminSuccess = data => ({type: GUESTADMIN, payload: data});

export const guestAdmin = param => {
  return async (dispatch, getState) => {
    try {
      const {
        next_page,
        per_page,
        last_page,
        isLoading,
        isRefreshing,
      } = getState().guestReducer;
      if (next_page > last_page || isLoading || isRefreshing) return true;

      await dispatch(guestAdminLoading());

      var body = new FormData();
      body.append('page', next_page);
      body.append('pageSize', per_page);

      var data = await dispatch(fetching('/guest/all_v2', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(guestAdminSuccess(data.data));
        console.log('Success; Guest; guestAdmin;');
        return true;
      } else {
        console.log('Fail; Guest; guestAdmin;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestAdmin;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const guestAdminRefreshing = () => ({type: GUESTADMIN_REFRESHING});

const guestAdminRefreshSuccess = data => ({
  type: GUESTADMIN_REFRESH,
  payload: data,
});

export const guestAdminRefresh = () => {
  return async (dispatch, getState) => {
    try {
      const {per_page, isLoading, isRefreshing} = getState().guestReducer;
      if (isLoading || isRefreshing) return true;

      await dispatch(guestAdminRefreshing());

      var body = new FormData();
      body.append('page', 0);
      body.append('pageSize', per_page);

      var data = await dispatch(fetching('/guest/all_v2', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(guestAdminRefreshSuccess(data.data));
        console.log('Success; Guest; guestAdminRefresh;');
        return true;
      } else {
        console.log('Fail; Guest; guestAdminRefresh;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestAdminRefresh;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const guestApproval = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('id', param.id);
      var data = await dispatch(fetching('/guest/approval', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(fetchingSuccess());
        console.log('Success; Guest; guestApproval;');
        return true;
      } else {
        console.log('Fail; Guest; guestApproval;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestApproval;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const guestReject = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('id', param.id);
      var data = await dispatch(fetching('/guest/reject', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(fetchingSuccess());
        console.log('Success; Guest; guestReject;');
        return true;
      } else {
        console.log('Fail; Guest; guestReject;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestReject;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const guestCheckSuccess = data => ({type: GUESTCHECK, payload: data});

export const guestCheck = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      await dispatch(guestCheckSuccess(param));
      await dispatch(fetchingSuccess());
      console.log('Success; Guest; guestCheck;');
      return true;
    } catch (err) {
      console.log('Error; Guest; guestCheck;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const guestMeetingSuccess = data => ({type: GUESTMEETING, payload: data});

export const guestMeeting = param => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());
      var body = new FormData();
      body.append('id', param.id);
      var data = await dispatch(fetching('/guest/find', 'POST', body));

      if (data.content == 'OK') {
        await dispatch(guestMeetingSuccess(data.data));
        await dispatch(fetchingSuccess());
        console.log('Success; Guest; guestMeeting;');
        return true;
      } else {
        console.log('Fail; Guest; guestMeeting;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; Guest; guestMeeting;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};
