import React, {Component} from 'react';
import {Toast} from 'native-base';

import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {tmpPhoto} from '../../redux/actions/loginAction';

import Selfie from '../Components/selfie';

class RegistrasiPhoto1 extends Component {
  state = {};

  next = data => {
    this.props.tmpPhoto(data.uri).then(success => {
      success
        ? this.props.navigation.navigate('RegistrasiPreview')
        : Toast.show({
            text: this.props.utilReducer.errorMessage,
            buttonText: 'Ok',
            type: 'danger',
            duration: 5000,
          });
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? <Selfie next={data => this.next(data)} /> : null;
  }
}

const RegistrasiPhoto = useIsFocused(RegistrasiPhoto1);

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer};
};

const mapDispatchToProps = {tmpPhoto};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrasiPhoto);
