import {PermissionsAndroid} from 'react-native';

export async function storage() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Download Permission',
        message:
          'We needs access to your storage and save file to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Download;');
    } else {
      console.log('FAIL; Permission; Download;');
    }
  } catch (err) {
    console.log('Error; Permission; Download;', err);
  }
  return flag;
}

export async function camera() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'We needs access to your camera to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Camera;');
    } else {
      console.log('FAIL; Permission; Camera;');
    }
  } catch (err) {
    console.log('Error; Permission; Camera;', err);
  }
  return flag;
}

export async function location() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We needs access to your gps to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Location;');
    } else {
      console.log('FAIL; Permission; Location;');
    }
  } catch (err) {
    console.log('Error; Permission; Location;', err);
  }
  return flag;
}

export async function phone_state() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'Phone State Permission',
        message: 'We needs access to your phone state to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Phone State;');
    } else {
      console.log('FAIL; Permission; Phone State;');
    }
  } catch (err) {
    console.log('Error; Permission; Phone State;', err);
  }
  return flag;
}

export async function call_log() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Permission',
        message: 'We needs access to your call log to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Call log;');
    } else {
      console.log('FAIL; Permission; Call log;');
    }
  } catch (err) {
    console.log('Error; Permission; Call log;', err);
  }
  return flag;
}

export async function sms() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS Permission',
        message: 'We needs access to your SMS to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; SMS;');
    } else {
      console.log('FAIL; Permission; SMS;');
    }
  } catch (err) {
    console.log('Error; Permission; SMS;', err);
  }
  return flag;
}

export async function contacts() {
  var flag = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'We needs access to your contacts to run this app.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      flag = true;
      console.log('SUCCESS; Permission; Contacts;');
    } else {
      console.log('FAIL; Permission; Contacts;');
    }
  } catch (err) {
    console.log('Error; Permission; Contacts;', err);
  }
  return flag;
}
