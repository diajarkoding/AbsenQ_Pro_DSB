import React, {Component} from 'react';

import {useIsFocused} from '@react-navigation/native';

import {connect} from 'react-redux';
import {loginByFace} from '../../redux/actions/loginAction';

import Selfie from '../Components/selfie';
import {ehandling, shandling} from '../Components/Util';

class LoginPhoto extends Component {
  state = {};

  componentDidMount() {}

  next = data => {
    this.props.loginByFace({photo: data.uri}).then(success => {
      if (success) {
        console.log(this.props.authReducer.whatami);
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
      } else ehandling(this.props);
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? <Selfie next={data => this.next(data)} /> : null;
  }
}

const LoginPhotoo = useIsFocused(LoginPhoto);

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, authReducer: state.authReducer};
};

const mapDispatchToProps = {loginByFace};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPhotoo);
