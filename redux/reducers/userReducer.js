import {
  USER_PERCOMPANY,
  USER_PERCOMPANY2,
  USER_PERCOMPANY_LOADING,
  USER_PERCOMPANY_REFRESH,
  USER_PERCOMPANY_REFRESHING,
  USER_PERCOMPANY_ADMIN,
  USER_PERCOMPANY_ADMIN_LOADING,
} from '../types';

const initalState = {
  admin: [],
  perCompany: [],
  perCompany2: [],
  per_page: 10,
  next_page: 0,
  last_page: 0,
  isLoading: false,
  isLoadingAdmin: false,
  isRefreshing: false,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case USER_PERCOMPANY:
      return {
        ...state,
        perCompany: action.payload.user,
        admin: action.payload.admin,
      };
    case USER_PERCOMPANY_LOADING:
      return {...state, isLoading: true};
    case USER_PERCOMPANY2:
      // console.log(action.payload.count);
      let tmp = action.payload.rows.filter(
        val => !state.perCompany2.some(data => data.id == val.id),
      );
      let last_page = ~~(action.payload.count / state.per_page);
      let next_page = state.next_page + 1;
      if (next_page > last_page) next_page = last_page;
      return {
        ...state,
        last_page,
        perCompany2: [].concat(state.perCompany2, tmp),
        next_page,
        isLoading: false,
      };
    case USER_PERCOMPANY_REFRESHING:
      return {...state, isRefreshing: true};
    case USER_PERCOMPANY_REFRESH:
      let tmp1 = action.payload.rows.filter(
        val => !state.perCompany2.some(data => data.id == val.id),
      );
      return {
        ...state,
        last_page: ~~(action.payload.count / state.per_page),
        perCompany2: [].concat(tmp1, state.perCompany2),
        isRefreshing: false,
      };
    case USER_PERCOMPANY_ADMIN:
      return {...state, admin: action.payload};
    case USER_PERCOMPANY_ADMIN_LOADING:
      return {...state, isLoadingAdmin: true};
    default:
      return state;
  }
};

export default authReducer;
