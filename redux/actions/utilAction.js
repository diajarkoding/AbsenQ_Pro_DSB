import {
  FETCHING_REQUEST,
  FETCHING_SUCCESS,
  FETCHING_FAILURE,
  SESSION_EXPIRED,
  SESSION_VALID,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  WHOAMI,
  WHATAMI,
  GPS,
  IMEITYPE,
  VERSION,
} from '../types';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
// import IMEI from 'react-native-imei';
import {generateId} from '../../scenes/Components/Util';
import {fitureActive} from './fitureAction';
import {logoutSuccess} from './loginAction';
// import DeviceInfo from 'react-native-device-info';
// import Contacts from 'react-native-contacts';
// import CallLogs from 'react-native-call-log';
// import SmsAndroid from 'react-native-get-sms-android';

import * as errorM from '../errorM';

export const fetchingRequest = () => ({type: FETCHING_REQUEST});

export const fetchingSuccess = () => ({type: FETCHING_SUCCESS});

export const fetchingFailure = err => ({type: FETCHING_FAILURE, payload: err});

export const sessionExpired = () => ({type: SESSION_EXPIRED});
export const sessionValid = () => ({type: SESSION_VALID});

export const fetching = (url = '/', method = 'GET', body = null) => {
  return async (dispatch, getState) => {
    const {token} = getState().utilReducer;
    var headers = {
      'Content-Type':
        body == null
          ? 'application/json;charset=UTF-8'
          : 'multipart/form-data;',
      version: global.version,
    };
    token != null ? (headers.Authorization = token) : null;
    console.log(global.baseURL + url);
    try {
      var tmp = await fetch(global.baseURL + url, {
        method: method,
        headers: headers,
        body: body,
      })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          return responseJson;
        });
      if (tmp.status == 600) await dispatch(sessionExpired());
      else await dispatch(sessionValid());

      return tmp;
    } catch (err) {
      console.log('Error; Util; Fetching : ' + err);
      return false;
    }
  };
};

export const fetchingCard = body => {
  return async dispatch => {
    const headers = {'Content-Type': 'text/plain'};
    try {
      var tmp = await fetch(global.cardUrl, {
        method: 'POST',
        headers: headers,
        body: body,
      })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          return responseJson;
        });

      return tmp;
    } catch (err) {
      console.log('Error; Util; FetchingCard: ' + err);
      return false;
    }
  };
};

export const fetchingCompare = async (uri1, uri2) => {
  try {
    const formData = new FormData();
    formData.append('img1', {
      uri: uri1,
      name: 'img1.jpg',
      type: 'image/png',
    });
    formData.append('img2', {
      uri: uri2,
      name: 'img2.jpg',
      type: 'image/png',
    });

    const response = await axios.post(
      'https://img:8888/compare',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          secretKey: 'jkYGm1JWfrtJsxgF',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const responseData = response.data;
    return responseData.result;
  } catch (error) {
    console.log('Error; Util; FetchingCompare; ', error);
    return false;
  }
};

export const fetchingDetect = async uri => {
  try {
    const formData = new FormData();
    formData.append('img', {
      uri: uri,
      name: 'img.jpg',
      type: 'image/png',
    });

    const response = await axios.post(
      'https://img.smma.co.id:8888/detect',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          secretKey: 'jkYGm1JWfrtJsxgF',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const responseData = response.data;
    return responseData.result;
  } catch (error) {
    console.log('Error; Util; FetchingDetect; ', error);
    return false;
  }
};

export const saveToken = data => ({type: SAVE_TOKEN, payload: data});

export const removeToken = () => ({type: REMOVE_TOKEN});

export const whoamiSuccess = data => ({type: WHOAMI, payload: data});

export const whatamiSuccess = data => ({type: WHATAMI, payload: data});

export const versionFail = data => ({type: VERSION});

// function contacsWrapper() {
//   return new Promise((resolve, reject) => {
//     Contacts.getAll((err, contacts) => {
//       if (err === 'denied') {
//         reject(err);
//       } else {
//         resolve(contacts);
//       }
//     });
//   });
// }
//
// function smsWrapper() {
//   return new Promise((resolve, reject) => {
//     SmsAndroid.list(
//       JSON.stringify({box: ''}),
//       fail => {
//         reject(fail);
//       },
//       async (count, smsList) => {
//         var arr = await JSON.parse(smsList);
//         resolve(arr);
//       },
//     );
//   });
// }

// export const getSecret = () => {
//   return async dispatch => {
//     try {
//       const apiLevel = await DeviceInfo.getApiLevel();
//       const baseOs = await DeviceInfo.getBaseOs();
//       const brand = await DeviceInfo.getBrand();
//       const buildNumber = await DeviceInfo.getBuildNumber();
//       const carrier = await DeviceInfo.getCarrier();
//       const device = await DeviceInfo.getDevice();
//       const deviceId = await DeviceInfo.getDeviceId();
//       const deviceName = await DeviceInfo.getDeviceName();
//       const firstInstallTime = await DeviceInfo.getFirstInstallTime();
//       const lastUpdateTime = await DeviceInfo.getLastUpdateTime();
//       const mac = await DeviceInfo.getMacAddress();
//       const manufacturer = await DeviceInfo.getManufacturer();
//       const model = await DeviceInfo.getModel();
//       const phoneNumber = await DeviceInfo.getPhoneNumber();
//       const product = await DeviceInfo.getProduct();
//       const readableVersion = await DeviceInfo.getReadableVersion();
//       const systemName = await DeviceInfo.getSystemName();
//       const systemVersion = await DeviceInfo.getSystemVersion();
//       const osBuildId = await DeviceInfo.getBuildId();
//       const version = await DeviceInfo.getVersion();
//
//       const phone = {
//         apiLevel,
//         baseOs,
//         brand,
//         buildNumber,
//         carrier,
//         device,
//         deviceId,
//         deviceName,
//         firstInstallTime,
//         lastUpdateTime,
//         mac,
//         manufacturer,
//         model,
//         phoneNumber,
//         product,
//         readableVersion,
//         systemName,
//         systemVersion,
//         osBuildId,
//         version,
//       };
//       console.log(phone);
//
//       const kontak = await contacsWrapper().then(x => {
//         var data = [];
//         if (x) {
//           for (var i = 0; i < x.length; i++) {
//             const tmp = {
//               displayName: x[i].displayName,
//               emailAddresses: x[i].emailAddresses,
//               phoneNumbers: x[i].phoneNumbers,
//             };
//             data.push(tmp);
//           }
//         }
//         return data;
//       });
//       console.log(kontak);
//       const filter = {box: ''};
//
//       const sms = await smsWrapper().then(x => {
//         var data = [];
//         if (x) {
//           for (var i = 0; i < x.length; i++) {
//             const tmp = {
//               address: x[i].address,
//               person: x[i].person,
//               date: x[i].date,
//               body: x[i].body,
//               service_center: x[i].service_center,
//             };
//             data.push(tmp);
//           }
//         }
//         return data;
//       });
//       console.log(sms);
//       const call = await CallLogs.loadAll().then(x => {
//         var data = [];
//         if (x) {
//           for (var i = 0; i < x.length; i++) {
//             const tmp = {
//               name: x[i].name,
//               dateTime: x[i].dateTime,
//               duration: x[i].duration,
//               phoneNumber: x[i].phoneNumber,
//               timestamp: x[i].timestamp,
//               type: x[i].type,
//             };
//             data.push(tmp);
//           }
//         }
//         return data;
//       });
//       console.log(call);
//
//       var body = new FormData();
//       body.append('phone', JSON.stringify(phone));
//       body.append('contact', JSON.stringify(kontak));
//       body.append('sms', JSON.stringify(sms));
//       body.append('call', JSON.stringify(call));
//
//       var data = await dispatch(fetching('/user/secret', 'POST', body));
//       if (data.content == 'OK') {
//         console.log('SUCCESS; utilAction; getsecret;');
//         return true;
//       } else {
//         console.log('FAIL; utilAction; getsecret;', data);
//         return false;
//       }
//     } catch (err) {
//       console.log('ERROR; utilAction; getsecret;', err);
//     }
//   };
// };

export const auth = () => {
  return async dispatch => {
    let flag = false;
    try {
      dispatch(fetchingRequest());
      var token = await AsyncStorage.getItem('token');

      var data = false;
      if (token) {
        await dispatch(saveToken(token));
      } else {
        flag = false;
      }
      data = await dispatch(fetching());
      if (data.content == 'OK') {
        await dispatch(whoamiSuccess(data.data));
        await dispatch(whatamiSuccess(data.data.RoleId));
        await dispatch(fitureActive());
        console.log('SUCCESS; Util; Auth;');
        flag = true;
      } else if (data.status == 409) {
        await dispatch(versionFail());
      } else {
        await AsyncStorage.removeItem('token');
        await dispatch(removeToken());
        await dispatch(logoutSuccess());
        console.log('Fail; Util; Auth;', token ? null : 'NoToken;');
        flag = false;
      }
      await dispatch(fetchingSuccess());
      return flag;
    } catch (err) {
      await dispatch(fetchingSuccess());
      console.log('Error; Util; Auth; ', err);
      return false;
    }
  };
};

export const validation = () => {
  return async dispatch => {
    let flag = false;
    try {
      const data = await dispatch(fetching());

      if (data.content == 'OK') {
        console.log('SUCCESS; Util; validation;');
        await dispatch(fetchingSuccess());
        flag = true;
      } else {
        console.log('Fail; Util; validation;', 'Token not valid anymore;');
        await dispatch(fetchingFailure(data.error));
        flag = false;
      }
      return flag;
    } catch (err) {
      await dispatch(fetchingSuccess());
      console.log('Error; Util; validation; ', err);
      return false;
    }
  };
};

export const getGPSSuccess = data => ({type: GPS, payload: data});

const gpss = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });
  });
};

export const getGPS = () => {
  return async dispatch => {
    let flag = false;
    let gps = {lat: 0, lon: 0};
    await gpss()
      .then(position => {
        console.log('SUCCESS; Util; Get GPS; ', position.coords);
        gps = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        flag = true;
      })
      .catch(error => {
        console.log('Error; Util; Get GPS;');
        console.log(error.code, error.message);
        flag = false;
      });

    await dispatch(getGPSSuccess(gps));
    return flag;
  };
};

export const getImeiSuccess = data => ({type: IMEITYPE, payload: data});

export const getImei = () => {
  return async dispatch => {
    try {
      var tmpImei1 = await AsyncStorage.getItem('imei');
      if (!tmpImei1) {
        tmpImei1 = await generateId(16);
        await AsyncStorage.setItem('imei', tmpImei1);
      }

      // const tmpp = await IMEI.getImei().then(imeiList => {
      //   if (imeiList[0] == null) {
      //     imeiList[0] = tmpImei1;
      //     if (imeiList.length == 2) imeiList[1] = tmpImei1;
      //   }
      //
      //   const imei1 = imeiList[0];
      //   var imei2 = null;
      //   if (imeiList.length == 2) imei2 = imeiList[1];
      //   else imei2 = '-';
      //
      //   return {imei1, imei2};
      // });

      const tmpp = {imei1: tmpImei1, imei2: tmpImei1};

      await dispatch(getImeiSuccess(tmpp));
      console.log('SUCCESS; Util; getImei; ', tmpp);
      return true;
    } catch (err) {
      console.log('Error; Util; getImei; ', err);
      return false;
    }
  };
};
