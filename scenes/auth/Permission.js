import React, {Component} from 'react';
import {Container, Toast, View} from 'native-base';
import {
  AsyncStorage,
  BackHandler,
  Linking,
  PermissionsAndroid,
} from 'react-native';

import {connect} from 'react-redux';
import {auth} from '../../redux/actions/utilAction';

import {styles} from '../styles';
import {loadView} from '../Components/Util';

class Permission extends Component {
  state = {perm: false};

  async camera() {
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
        this.setState({perm: true});
        console.log('Success; Permission; Camera;');
      } else {
        this.setState({perm: false});
        console.log('Fail; Permission; Camera;');
      }
    } catch (err) {
      this.setState({perm: false});
      console.log('Error; Permission; Camera;', err);
    }
  }

  async location() {
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
        this.setState({perm: true});
        console.log('Success; Permission; Location;');
      } else {
        this.setState({perm: false});
        console.log('Fail; Permission; Location;');
      }
    } catch (err) {
      this.setState({perm: false});
      console.log('Error; Permission; Location;', err);
    }
  }

  async phone_state() {
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
        this.setState({perm: true});
        console.log('Success; Permission; Phone State;');
      } else {
        this.setState({perm: false});
        console.log('Fail; Permission; Phone State;');
      }
    } catch (err) {
      this.setState({perm: false});
      console.log('Error; Permission; Phone State;', err);
    }
  }

  // async phone_privileged_state() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_PRIVILEGED_PHONE_STATE,
  //       {
  //         title: 'Phone Privileged State Permission',
  //         message:
  //           'We needs access to your phone privileged state to run this app.',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       this.setState({perm: true});
  //       console.log('Success; Permission; Phone Privileged State;');
  //     } else {
  //       this.setState({perm: false});
  //       console.log('Fail; Permission; Phone Privileged State;');
  //     }
  //   } catch (err) {
  //     console.log('Error; Permission; Phone Privileged State;', err);
  //     this.setState({perm: false});
  //   }
  // }

  async componentDidMount() {
    await this.camera();
    await this.phone_state();
    await this.location();
    // await this.phone_privileged_state();
    if (!this.state.perm) {
      console.log(this.state.perm);
      BackHandler.exitApp();
    } else this.props.navigation.navigate('Auth');
  }

  render() {
    return <Container>{loadView}</Container>;
  }
}

const mapStateToProps = state => {
  return {authReducer: state.authReducer};
};

const mapDispatchToProps = {auth};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Permission);
