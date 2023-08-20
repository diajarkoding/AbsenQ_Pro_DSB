import React, {Component} from 'react';
import {Toast} from 'native-base';

import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {tmpPhoto} from '../../redux/actions/tmpAction';
import {ehandling} from '../Components/Util';

import Selfie from '../Components/selfie';

class RegistrasiPhoto1 extends Component {
  state = {};

  next = data => {
    this.props.tmpPhoto(data.uri, false).then(success => {
      success
        ? this.props.navigation.navigate('RegistrasiPreview')
        : ehandling(this.props);
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? (
      <Selfie next={data => this.next(data)} open={true} />
    ) : null;
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
