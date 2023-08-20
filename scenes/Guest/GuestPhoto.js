import React, {Component} from 'react';
import {Toast} from 'native-base';

import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {tmpGuestPhoto} from '../../redux/actions/tmpAction';
import {ehandling} from '../Components/Util';

import Selfie from '../Components/selfie';

class GuestPhoto1 extends Component {
  state = {};

  next = data => {
    this.props.tmpGuestPhoto(data.uri).then(success => {
      success
        ? this.props.navigation.navigate('GuestPreview')
        : ehandling(this.props);
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? (
      <Selfie next={data => this.next(data)} open={true} backCam={true} />
    ) : null;
  }
}

const GuestPhoto = useIsFocused(GuestPhoto1);

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer};
};

const mapDispatchToProps = {tmpGuestPhoto};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestPhoto);
