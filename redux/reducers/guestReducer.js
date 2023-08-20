import {
  GUESTUSER,
  GUESTADMIN,
  GUESTADMIN_LOADING,
  GUESTADMIN_REFRESHING,
  GUESTADMIN_REFRESH,
  GUESTCHECK,
  GUESTMEETING,
} from '../types';

const initalState = {
  guest_user: [],
  guest_admin: [],
  guest_check: null,
  guest_meeting: {
    date: null,
    location: null,
    photo: null,
    purpose: null,
    name: null,
    email: null,
    phone: null,
  },
  guests_meeting: [],
  per_page: 10,
  next_page: 0,
  last_page: 0,
  isLoading: false,
  isRefreshing: false,
};

const guestReducer = (state = initalState, action) => {
  switch (action.type) {
    case GUESTUSER:
      for (let i = 0; i < action.payload.length; i++) {
        var guests = [];
        var name = action.payload[i].name.split(',');
        var phone = action.payload[i].phone.split(',');
        var email = action.payload[i].email.split(',');

        for (let i = 0; i < name.length; i++) {
          guests.push({name: name[i], phone: phone[i], email: email[i]});
        }
        action.payload[i].guests = guests;
      }

      return {...state, guest_user: action.payload};
    case GUESTADMIN_LOADING:
      return {...state, isLoading: true};
    case GUESTADMIN:
      let tmp = action.payload.rows.filter(
        val => !state.guest_admin.some(data => data.id == val.id),
      );
      let last_page = ~~(action.payload.count / state.per_page);
      let next_page = state.next_page + 1;
      for (let i = 0; i < tmp.length; i++) {
        var guests = [];
        var name = tmp[i].name.split(',');
        var phone = tmp[i].phone.split(',');
        var email = tmp[i].email.split(',');

        for (let i = 0; i < name.length; i++) {
          guests.push({name: name[i], phone: phone[i], email: email[i]});
        }
        tmp[i].guests = guests;
      }

      return {
        ...state,
        last_page,
        guest_admin: [].concat(state.guest_admin, tmp),
        next_page,
        isLoading: false,
      };
    case GUESTCHECK:
      return {...state, guest_check: action.payload};
    case GUESTMEETING:
      var name = action.payload.name.split(',');
      var phone = action.payload.phone.split(',');
      var email = action.payload.email.split(',');

      var guests = [];

      for (let i = 0; i < name.length; i++) {
        guests.push({name: name[i], phone: phone[i], email: email[i]});
      }
      return {...state, guest_meeting: action.payload, guests_meeting: guests};
    case GUESTADMIN_REFRESHING:
      return {...state, isLoading: true, guest_admin: []};
    case GUESTADMIN_REFRESH:
      let tmp1 = action.payload.rows.filter(
        val => !state.guest_admin.some(data => data.id == val.id),
      );
      let last_page1 = ~~(action.payload.count / state.per_page);
      let next_page1 = state.next_page + 1;
      for (let i = 0; i < tmp1.length; i++) {
        var guests = [];
        var name = tmp1[i].name.split(',');
        var phone = tmp1[i].phone.split(',');
        var email = tmp1[i].email.split(',');

        for (let i = 0; i < name.length; i++) {
          guests.push({name: name[i], phone: phone[i], email: email[i]});
        }
        tmp1[i].guests = guests;
      }

      return {
        ...state,
        last_page: last_page1,
        guest_admin: [].concat(state.guest_admin, tmp1),
        next_page: next_page1,
        isRefreshing: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default guestReducer;
