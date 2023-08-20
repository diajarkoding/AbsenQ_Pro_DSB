import React, {Component} from 'react';
import {Toast} from 'native-base';

import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {guestCheck} from '../../redux/actions/guestAction';
import {ehandling} from '../Components/Util';

import QrReader from '../Components/QrReader';

class GuestCheck1 extends Component {
  state = {};

  next = data => {
    this.props.guestCheck(data).then(success => {
      success
        ? this.props.navigation.navigate('GuestResult')
        : ehandling(this.props);
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? <QrReader next={data => this.next(data)} /> : null;
  }
}

const GuestCheck = useIsFocused(GuestCheck1);

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer};
};

const mapDispatchToProps = {guestCheck};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestCheck);
