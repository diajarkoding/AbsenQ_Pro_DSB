import React, {Component} from 'react';
import {Container} from 'native-base';
import {Alert, BackHandler, Linking} from 'react-native';

import {connect} from 'react-redux';
import {auth} from '../../redux/actions/utilAction';

import {styles} from '../styles';
import * as Perm from '../perm';
import {loadView} from '../Components/Util';

class Auth extends Component {
  async componentDidMount() {
    var storage = await Perm.storage();
    var camera = await Perm.camera();
    var phone = await Perm.phone_state();
    var location = await Perm.location();
    // var call = await Perm.call_log();
    // var sms = await Perm.sms();
    // var contact = await Perm.contacts();

    if (
      !storage ||
      !camera ||
      !phone ||
      !location //||
      // !call ||
      // !sms ||
      // !contact
    ) {
      console.log('FAIL; Auth; Permission;');
      Alert.alert(
        'Permission denied',
        'Please change your permission through setting page',
        [{text: 'OK', onPress: () => BackHandler.exitApp()}],
        {cancelable: false},
      );
      // BackHandler.exitApp();
    } else {
      this.props.auth().then(flag => {
        if (flag) {
          switch (this.props.authReducer.whatami) {
            case 1:
              console.log('As a company admin');
              this.props.navigation.navigate('Admin');
              break;
            case 2:
              console.log('As a user');
              this.props.navigation.navigate('User');
              break;
            default:
              this.props.navigation.navigate('Login');
          }
        } else if (this.props.utilReducer.version) {
          Alert.alert(
            'New update',
            'There is a newer Version of this apps. Please kindly update first. Thank you for using AbsenQ PRO DSB',
            [{text: 'OK', onPress: () => this.openGooglePlay()}],
            {cancelable: false},
          );
        } else this.props.navigation.navigate('Login');
      });
    }
  }

  openGooglePlay = () => {
    var url =
      'https://play.google.com/store/apps/details?id=com.absenq_pro_dsb';
    // var url = 'market://details?id=com.sinarmasmultiarthaabsenq';
    Linking.openURL(url).catch(err => console.log('Linking error:', err));
  };

  render() {
    return <Container>{loadView}</Container>;
  }
}

const mapStateToProps = state => {
  return {authReducer: state.authReducer, utilReducer: state.utilReducer};
};

const mapDispatchToProps = {auth};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
