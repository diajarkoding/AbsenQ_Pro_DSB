import {
  USER_PERCOMPANY,
  USER_PERCOMPANY2,
  USER_PERCOMPANY_REFRESH,
  USER_PERCOMPANY_LOADING,
  USER_PERCOMPANY_REFRESHING,
  USER_PERCOMPANY_ADMIN,
  USER_PERCOMPANY_ADMIN_LOADING,
} from '../types';

import {
  fetchingRequest,
  fetchingSuccess,
  fetchingFailure,
  fetching,
} from './utilAction';
import * as errorM from '../errorM';

const userPerCompanySuccess = data => ({type: USER_PERCOMPANY, payload: data});

export const userPerCompany = () => {
  return async dispatch => {
    try {
      await dispatch(fetchingRequest());

      var data = await dispatch(fetching('/user/perCompany', 'GET'));
      if (data.content == 'OK') {
        var tmpAdmin = [];
        var tmpUser = [];
        for (var user in data.data) {
          if (data.data[user].RoleId == 1) {
            tmpAdmin.push(data.data[user]);
          } else {
            tmpUser.push(data.data[user]);
          }
        }
        await dispatch(userPerCompanySuccess({admin: tmpAdmin, user: tmpUser}));
        await dispatch(fetchingSuccess());
        console.log('Success; User; perCompany;');
        return true;
      } else {
        console.log('Fail; User; perCompany;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; User; perCompany;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const userPerCompanyLoading = () => ({type: USER_PERCOMPANY_LOADING});

const userPerCompanySuccess2 = data => ({
  type: USER_PERCOMPANY2,
  payload: data,
});

export const userPerCompany2 = () => {
  return async (dispatch, getState) => {
    try {
      const {
        next_page,
        per_page,
        last_page,
        isLoading,
        isRefreshing,
      } = getState().userReducer;
      if (next_page > last_page || isLoading || isRefreshing) return true;

      await dispatch(userPerCompanyLoading());

      var body = new FormData();
      body.append('page', next_page);
      body.append('pageSize', per_page);

      var data = await dispatch(fetching('/user/perCompany_v2', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(userPerCompanySuccess2(data.data));
        console.log('Success; User; perCompany_v2;');
        return true;
      } else {
        console.log('Fail; User; perCompany_v2;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; User; perCompany_v2;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const userPerCompanyRefreshing = () => ({type: USER_PERCOMPANY_REFRESHING});

const userPerCompanyRefreshSuccess = data => ({
  type: USER_PERCOMPANY_REFRESH,
  payload: data,
});

export const userPerCompanyRefresh = () => {
  return async (dispatch, getState) => {
    try {
      const {per_page, isLoading, isRefreshing} = getState().userReducer;
      if (isLoading || isRefreshing) return true;

      await dispatch(userPerCompanyRefreshing());

      var body = new FormData();
      body.append('page', 0);
      body.append('pageSize', per_page);

      var data = await dispatch(fetching('/user/perCompany_v2', 'POST', body));
      if (data.content == 'OK') {
        await dispatch(userPerCompanyRefreshSuccess(data.data));
        console.log('Success; User; userPerCompanyRefresh;');
        return true;
      } else {
        console.log('Fail; User; userPerCompanyRefresh;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; User; userPerCompanyRefresh;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

const userPerCompanyAdminLoading = () => ({
  type: USER_PERCOMPANY_ADMIN_LOADING,
});

const userPerCompanyAdminSuccess = data => ({
  type: USER_PERCOMPANY_ADMIN,
  payload: data,
});

export const userPerCompanyAdmin = () => {
  return async (dispatch, getState) => {
    try {
      const {isLoadingAdmin} = getState().userReducer;
      if (isLoadingAdmin) return true;

      await dispatch(userPerCompanyAdminLoading());

      var data = await dispatch(fetching('/user/admin_v2', 'GET'));
      if (data.content == 'OK') {
        await dispatch(userPerCompanyAdminSuccess(data.data));
        console.log('Success; User; userPerCompanyAdmin;');
        return true;
      } else {
        console.log('Fail; User; userPerCompanyAdmin;');
        console.log(data);
        await dispatch(fetchingFailure(data.error));
        return false;
      }
    } catch (err) {
      console.log('Error; User; userPerCompanyAdmin;');
      console.log(err);
      await dispatch(fetchingFailure(errorM.sistemDown));
      return false;
    }
  };
};

export const userFetch = () => {
  return dispatch => {
    var hasil = true;
    userPerCompanyAdmin();
    userPerCompany2();
  };
};
