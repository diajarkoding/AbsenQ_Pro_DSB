import {
  ABSENSI_CREATE,
  ABSENSI_ALL_BY7,
  ABSENSI_ALL_PERCOMPANY,
  ABSENSI_ALL_PERCOMPANY2,
  ABSENSI_ALL_PERCOMPANY_REFRESH,
  ABSENSI_LOADING,
  ABSENSI_REFRESHING,
} from '../types';

const initalState = {
  data_allBy7: [],
  data_perCompany: [],
  data_perCompany2: [],
  per_page: 10,
  next_page: 0,
  last_page: 0,
  isLoading: false,
  isRefreshing: false,
  created: null,
};

const absensiReducer = (state = initalState, action) => {
  switch (action.type) {
    case ABSENSI_CREATE:
      return {...state, created: action.payload};
    case ABSENSI_ALL_BY7:
      return {...state, data_allBy7: action.payload};
    case ABSENSI_ALL_PERCOMPANY:
      return {...state, data_perCompany: action.payload};
    case ABSENSI_LOADING:
      return {...state, isLoading: true};
    case ABSENSI_ALL_PERCOMPANY2:
      let tmp = action.payload.rows.filter(
        val => !state.data_perCompany2.some(data => data.id == val.id),
      );
      return {
        ...state,
        last_page: ~~(action.payload.count / state.per_page),
        data_perCompany2: [].concat(state.data_perCompany2, tmp),
        next_page: state.next_page + 1,
        isLoading: false,
      };
    case ABSENSI_REFRESHING:
      return {...state, isRefreshing: true};
    case ABSENSI_ALL_PERCOMPANY_REFRESH:
      let tmp1 = action.payload.rows.filter(
        val => !state.data_perCompany2.some(data => data.id == val.id),
      );
      return {
        ...state,
        last_page: ~~(action.payload.count / state.per_page),
        data_perCompany2: [].concat(tmp1, state.data_perCompany2),
        isRefreshing: false,
      };
    default:
      return state;
  }
};

export default absensiReducer;
